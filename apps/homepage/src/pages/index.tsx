import { NextPage } from 'next';
import React from 'react';

import Home from '../modules/home';
import {
  getInitialHomeStoreState,
  HomeStore,
  HomeStoreContext,
  InitialHomeStoreState,
} from '../modules/home/store';

import Page from 'src/components/Page';

interface Props {
  initialState: InitialHomeStoreState;
  title: string;
  description: string;
}

const HomePage: NextPage<Props> = ({ initialState, title, description }) => {
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
  const initialState = await getInitialHomeStoreState();
  const title = 'Rocket Auto: Buy Used Cars & Trucks Online';
  const description =
    'Buy a used car online from anywhere in the USA. We offer easy car buying, high quality cars, & delivery right to you.';
  return { initialState, title, description };
};

export default HomePage;
