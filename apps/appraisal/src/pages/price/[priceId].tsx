import { SimpleHeader } from '@vroom-web/header-components';
import Footer from 'src/core/Footer';
import React from 'react';
import { NextPage } from 'next';

import PriceView from 'src/modules/price';
import {
  getInitialPriceStoreState,
  PriceStoreContext,
  PriceStore,
} from 'src/modules/price/store';
import Page from 'src/Page';
import getConfig from 'next/config';

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
        <PriceView />
        <Footer />
      </PriceStoreContext.Provider>
    </Page>
  );
};

Price.getInitialProps = async ({ query }): Promise<Props> => {
  // http://localhost:3000/appraisal/price/e93bafe0b739241f875d1e3c35416fff
  const priceId = query.priceId as string;
  const initialState = await getInitialPriceStoreState(priceId);
  return { initialState };
};

export default Price;
