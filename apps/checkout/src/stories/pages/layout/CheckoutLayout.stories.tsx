import { Body, Heading } from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';

import { fakeData, deal } from './ViewModel';

import CheckoutLayout from 'src/modules/common/CheckoutLayout';
import { DealContext, DealStore } from 'src/modules/store/DealStore';

export const Default = (): JSX.Element => {
  const store = new DealStore(4, false, deal);
  return (
    <DealContext.Provider value={store}>
      <CheckoutLayout>
        <Heading.Four>Test Data</Heading.Four>
        <hr />
        {[...Array(23)].map((i: number) => (
          <div key={i}>
            <Body.Regular>{fakeData}</Body.Regular>
            <hr />
          </div>
        ))}
      </CheckoutLayout>
    </DealContext.Provider>
  );
};

export default {
  title: 'Checkout/CheckoutLayout',
};
