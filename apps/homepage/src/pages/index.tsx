import { NextPage, NextPageContext } from 'next';
import { parseCookies } from 'nookies';
import React from 'react';
import { UAParser } from 'ua-parser-js';
import { Experiment } from 'vroom-abtesting-sdk/types';

import experimentSDK from 'src/integrations/experimentSDK';
import Home from 'src/modules/home';
import { HomeStore, HomeStoreContext } from 'src/modules/home/store';
import Page from 'src/Page';

interface Props {
  description: string;
  experiments: Experiment[];
  query: {};
  title: string;
  deviceType: string;
}

const HomePage: NextPage<Props> = ({
  description,
  experiments,
  query,
  title,
  deviceType,
}) => {
  const store = new HomeStore({
    deviceType,
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
    <Page experiments={experiments} name="Home" head={head}>
      <HomeStoreContext.Provider value={store}>
        <Home />
      </HomeStoreContext.Provider>
    </Page>
  );
};

HomePage.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const title = 'Vroom: Buy, Sell or Trade-In Used Vehicles Online';
  const description =
    'Buy, sell or trade-in a certified used car online from anywhere in the USA. We offer no-haggle car buying, top quality cars, full warranties & home shipping.';
  const cookies = parseCookies(ctx);
  const marketingId = cookies['uuid'];
  const experiments = await experimentSDK.getRunningExperiments(
    marketingId,
    'website'
  );

  const query = ctx.query;
  const ua = new UAParser(ctx.req?.headers['user-agent']);
  const deviceType = ua.getDevice().type || 'desktop';

  return { description, experiments, query, title, deviceType };
};

export default HomePage;
