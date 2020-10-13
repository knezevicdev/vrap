import Footer from 'src/core/Footer';
import Page from 'src/Page';
import PriceInfo from 'src/modules/price';
import Questions from 'src/modules/questions';
import React from 'react';
import getConfig from 'next/config';
import { NextPage } from 'next';
import { SimpleHeader } from '@vroom-web/header-components';
import {
  getInitialPriceStoreState,
  PriceStore,
  PriceStoreContext,
} from 'src/modules/price/store';

interface Props {
  initialState: PriceStore;
}

const { publicRuntimeConfig } = getConfig();

const Price: NextPage<Props> = ({ initialState }) => {
  const gearboxPrivateUrl = publicRuntimeConfig.GEARBOX_PRIVATE_URL;

  return (
    <Page name="Home">
      <PriceStoreContext.Provider value={initialState}>
        <SimpleHeader gearboxPrivateUrl={gearboxPrivateUrl} />
        <PriceInfo />
        <Questions />
        <Footer />
      </PriceStoreContext.Provider>
    </Page>
  );
};

Price.getInitialProps = async ({ query }): Promise<Props> => {
  // automated price
  // http://localhost:3000/appraisal/price/e93bafe0b739241f875d1e3c35416fff

  // manual price
  // http://localhost:3000/appraisal/price/d9b61a51f993808577a102eecbe8df0d

  const priceId = query.priceId as string;
  const initialState = await getInitialPriceStoreState(priceId);
  return { initialState };
};

export default Price;
