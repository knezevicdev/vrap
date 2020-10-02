import { StandardFooter } from '@vroom-web/footer-components';
import { SimpleHeader } from '@vroom-web/header-components';
import { NextPage } from 'next';
import getConfig from 'next/config';
import React from 'react';
import Page from 'src/Page';
import Price from 'src/modules/price';

import {
  getInitialPriceStoreState,
  PriceStore,
  PriceStoreState,
} from 'src/modules/price/store';

const { publicRuntimeConfig } = getConfig();

const Price: NextPage = () => {
  const gearboxPrivateUrl = publicRuntimeConfig.GEARBOX_PRIVATE_URL;

  return (
    <Page name="Home" head={head}>
      <SimpleHeader gearboxPrivateUrl={gearboxPrivateUrl} />
      <Price />
      <StandardFooter />
    </Page>
  );
};

// interface Props {
//   initialState: PriceStoreState;
// }

// Price.getInitialProps = async ({ query }): Promise<Props> => {
//   // e93bafe0b739241f875d1e3c35416fff
//   const priceId = query.priceId as string;
//   console.log({ priceId });
//   const initialState = await getInitialPriceStoreState(priceId);
// 
//   return { initialState };
// };

export default Price;
