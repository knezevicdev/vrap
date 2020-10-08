import { StandardFooter } from '@vroom-web/footer-components';
import { SimpleHeader } from '@vroom-web/header-components';
import { NextPage } from 'next';
import getConfig from 'next/config';
import React from 'react';

import PriceView from 'src/modules/price';
import {
  getInitialPriceStoreState,
  PriceStoreContext,
  PriceStore,
} from 'src/modules/price/store';
import Page from 'src/Page';

const { publicRuntimeConfig } = getConfig();

interface Props {
  initialState: PriceStore;
}

const Price: NextPage<Props> = ({ initialState }) => {
  const gearboxPrivateUrl = publicRuntimeConfig.GEARBOX_PRIVATE_URL;

  return (
    <Page name="Home">
      <PriceStoreContext.Provider value={initialState}>
        <SimpleHeader gearboxPrivateUrl={gearboxPrivateUrl} />
        <PriceView />
        <StandardFooter />
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
