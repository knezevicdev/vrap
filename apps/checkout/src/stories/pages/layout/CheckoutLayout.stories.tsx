import { Heading } from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';

import { mockDeal, mockVehicle } from './ViewModel';

import CheckoutLayout from 'src/modules/common/CheckoutLayout';
import { DealContext, DealStore } from 'src/modules/store/DealStore';

const store = new DealStore(4, false, mockDeal, mockVehicle);
const height = 500;

export const ShowCarCard = (): JSX.Element => {
  return (
    <DealContext.Provider value={store}>
      <CheckoutLayout showCarCard={true}>
        <div style={{ height: `${height}px` }}>
          <Heading.Four>{`Div of ${height}px height`}</Heading.Four>
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
          <Heading.Four>{`Div of ${height}px height`}</Heading.Four>
        </div>
      </CheckoutLayout>
    </DealContext.Provider>
  );
};

export default {
  title: 'Checkout/CheckoutLayout',
};
