import { Heading } from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';

import { dealState } from './ViewModel';

import { DealProvider } from 'src/core/contexts';
import { DealStore } from 'src/core/store';
import CheckoutLayout from 'src/modules/common/CheckoutLayout';

const store = new DealStore(dealState);
const height = 500;

export const ShowCarCard = (): JSX.Element => {
  return (
    <DealProvider value={store}>
      <CheckoutLayout showCarCard={true}>
        <div style={{ height: `${height}px` }}>
          <Heading.Four>{`Demo ${height}px`}</Heading.Four>
        </div>
      </CheckoutLayout>
    </DealProvider>
  );
};

export const ShowDealSummary = (): JSX.Element => {
  return (
    <DealProvider value={store}>
      <CheckoutLayout showCarCard={false}>
        <div style={{ height: `${height}px` }}>
          <Heading.Four>{`Demo ${height}px`}</Heading.Four>
        </div>
      </CheckoutLayout>
    </DealProvider>
  );
};

export default {
  title: 'Checkout/CheckoutLayout',
};
