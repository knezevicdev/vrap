import { SimpleHeader } from '@vroom-web/header-components';
import { NextPage } from 'next';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import React from 'react';

import Footer from 'src/core/Footer';
import PriceInfo from 'src/modules/price';
import { PriceStore, PriceStoreContext } from 'src/modules/price/store';
import Questions from 'src/modules/questions';
import Page from 'src/Page';

const { publicRuntimeConfig } = getConfig();

const Price: NextPage = () => {
  const gearboxPrivateUrl = publicRuntimeConfig.GEARBOX_PRIVATE_URL;
  // automated price
  // http://localhost:3000/appraisal/price/e93bafe0b739241f875d1e3c35416fff

  // manual price
  // http://localhost:3000/appraisal/price/d9b61a51f993808577a102eecbe8df0d

  const router = useRouter();
  const priceId = router.query.priceId as string;
  const store = new PriceStore(priceId);

  return (
    <Page name="Home">
      <PriceStoreContext.Provider value={store}>
        <SimpleHeader gearboxPrivateUrl={gearboxPrivateUrl} />
        <PriceInfo />
        <Questions />
        <Footer />
      </PriceStoreContext.Provider>
    </Page>
  );
};

export default Price;
