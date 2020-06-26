import { NextPage, NextPageContext } from 'next';
import { parseCookies } from 'nookies';
import React from 'react';
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
}

const HomePage: NextPage<Props> = ({
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
    'Buy, sell or trade-in your car entirely online, from the comfort of your home. No haggle, no pressure. Easy online financing available. Browse thousands of high-quality cars, and have it delivered straight to you.';
  const cookies = parseCookies(ctx);
  const marketingId = cookies['uuid'];
  const experiments = await experimentSDK.getRunningExperiments(marketingId);

  const query = ctx.query;

  return { description, experiments, query, title };
};

export default HomePage;
