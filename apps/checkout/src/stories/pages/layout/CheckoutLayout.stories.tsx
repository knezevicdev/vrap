import { Body, Heading } from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';

import { fakeData, testProps } from './ViewModel';

import CheckoutLayout from 'src/modules/common/CheckoutLayout';
import { DealContext } from 'src/modules/store/DealStore';

export const Default = (): JSX.Element => {
  return (
    <DealContext.Provider value={testProps}>
      <CheckoutLayout>
        <Heading.Four>Test Data</Heading.Four>
        <hr />
        {[...Array(3)].map((i: number) => (
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
