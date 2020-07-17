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
      <meta name="description" content={description}></meta>
    </>
  );

  return (
    <ThemeProvider brand={brand}>
      <Page experiments={experiments} name="Home" head={head}>
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
  const title = 'Vroom: Buy, Sell or Trade-In Used Vehicles Online';
  const description =
    'Buy, sell or trade-in your car entirely online, from the comfort of your home. No haggle, no pressure. Easy online financing available. Browse thousands of high-quality cars, and have it delivered straight to you.';
  const cookies = parseCookies(ctx);
  const marketingId = cookies['uuid'];
  const query = ctx.query;

  // FIT-570
  // TODO: replace this mechanism with the actual one.
  // Some data should come from ctx.req, rather than from query.
  const brandQueryParam = query.brand;
  const brand = brandQueryParam === 'santander' ? Brand.SANTANDER : Brand.VROOM;

  const experiments =
    brand === Brand.VROOM
      ? await experimentSDK.getRunningExperiments(marketingId)
      : [];

  return { brand, description, experiments, query, title };
};

export default HomePage;
