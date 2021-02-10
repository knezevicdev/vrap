import { Heading } from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';

import { deal } from './ViewModel';

import CheckoutLayout from 'src/modules/common/CheckoutLayout';
import { DealContext, DealStore } from 'src/modules/store/DealStore';

export const Default = (): JSX.Element => {
  const store = new DealStore(4, false, deal);
  const height = 500;
  return (
    <DealContext.Provider value={store}>
      <CheckoutLayout>
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
