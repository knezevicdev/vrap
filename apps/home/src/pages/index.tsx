/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-nested-ternary */

import { Brand, ThemeProvider } from '@vroom-web/ui';
import { NextPage, NextPageContext } from 'next';
import { parseCookies } from 'nookies';
import React from 'react';
import { Experiment } from 'vroom-abtesting-sdk/types';

import experimentSDK from 'src/integrations/experimentSDK';
import Home from 'src/modules/home';
import { BrandContext } from 'src/modules/home/BrandContext';
import { HomeStore, HomeStoreContext } from 'src/modules/home/store';
import Page from 'src/Page';

const NodeCache = require('node-cache');
const cache = new NodeCache();

interface Props {
  brand: Brand;
  description: string;
  experiments: Experiment[];
  query: {};
  title: string;
}

const HomePage: NextPage<Props> = ({
  brand,
  description,
  experiments,
  query,
  title,
}) => {
  const store = new HomeStore({
    experiments,
    query,
  });
  const head = (
    <>
      <title>{title}</title>
      <link rel="canonical" href="/" />
      <meta name="description" content={description}></meta>
    </>
  );

  return (
    <ThemeProvider brand={brand}>
      <Page brand={brand} experiments={experiments} name="Home" head={head}>
        <BrandContext.Provider value={brand}>
          <HomeStoreContext.Provider value={store}>
            <Home />
          </HomeStoreContext.Provider>
        </BrandContext.Provider>
      </Page>
    </ThemeProvider>
  );
};

HomePage.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const cookies = parseCookies(ctx);
  const marketingId = cookies['uuid'];
  const query = ctx.query;

  const { req } = ctx;
  const headerBrandKey = 'x-brand';
  const santanderKey = 'santander';
  const brandHeader = req && req.headers[headerBrandKey];
  const queryBrand = query.brand;

  const brand =
    (brandHeader || queryBrand) == santanderKey ? Brand.SANTANDER : Brand.VROOM;

  const title =
    brand === Brand.SANTANDER
      ? 'Santander Consumer USA: Buy Used Cars, Trucks & SUVs Online'
      : 'Vroom: Buy, Sell or Trade-In Used Vehicles Online';

  const description =
    brand === Brand.SANTANDER
      ? 'Buy a used vehicle online from anywhere in the USA. We offer high quality cars, easy car buying, & flexible financing.'
      : 'Buy, sell or trade-in your car entirely online, from the comfort of your home. No haggle, no pressure. Easy online financing available. Browse thousands of high-quality cars, and have it delivered straight to you.';

  const experimentsCache = cache.get('experiments');
  const experiments =
    brand === Brand.VROOM
      ? experimentsCache
        ? experimentsCache
        : await new Promise((resolve) => {
            experimentSDK
              .getRunningExperiments(marketingId as string)
              .then((response) => {
                cache.set('experiments', response, 60);
                resolve(response);
              })
              .catch((error) => {
                console.log('Experiments failed - ', JSON.stringify(error));
                resolve([]);
              });
          })
      : [];

  return { brand, description, experiments, query, title };
};

export default HomePage;
