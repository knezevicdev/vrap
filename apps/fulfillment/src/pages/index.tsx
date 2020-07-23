import { NextPage } from 'next';
import React from 'react';

import Home from 'src/modules/home';
import {
  getInitialHomeStoreState,
  HomeStore,
  HomeStoreContext,
  HomeStoreState,
} from 'src/modules/home/store';
import Page from 'src/Page';

interface Props {
  description: string;
  title: string;
  initialState: HomeStoreState;
}

const HomePage: NextPage<Props> = ({ description, title, initialState }) => {
  const head = (
    <>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
    </>
  );

  const store = new HomeStore(initialState);

  return (
    <Page name="Home" head={head}>
      <HomeStoreContext.Provider value={store}>
        <Home />
      </HomeStoreContext.Provider>
    </Page>
  );
};

HomePage.getInitialProps = async (): Promise<Props> => {
  const title = 'Vroom Fulfillment';
  const description = '';
  const initialState = await getInitialHomeStoreState();

  return { description, title, initialState };
};

export default HomePage;
