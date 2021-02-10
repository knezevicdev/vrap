import { Heading } from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';

import { dealState } from './ViewModel';

import CheckoutLayout from 'src/modules/common/CheckoutLayout';
import { DealContext, DealStore } from 'src/modules/store/DealStore';

const store = new DealStore(dealState);
const height = 500;

export const ShowCarCard = (): JSX.Element => {
  return (
    <DealContext.Provider value={store}>
      <CheckoutLayout showCarCard={true}>
        <div style={{ height: `${height}px` }}>
          <Heading.Four>{`Demo ${height}px`}</Heading.Four>
        </div>
      </CheckoutLayout>
    </DealContext.Provider>
  );
};

export const ShowDealSummary = (): JSX.Element => {
  return (
    <DealContext.Provider value={store}>
      <CheckoutLayout showCarCard={false}>
        <div style={{ height: `${height}px` }}>
          <Heading.Four>{`Demo ${height}px`}</Heading.Four>
        </div>
      </CheckoutLayout>
    </DealContext.Provider>
  );
};

export default {
  title: 'Checkout/CheckoutLayout',
};
