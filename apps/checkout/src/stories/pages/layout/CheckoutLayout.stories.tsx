import { Body, Heading } from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';

import CheckoutLayout from 'src/modules/common/CheckoutLayout';

export const Default = (): JSX.Element => {
  const steps = [
    'Trade-In Info',
    'Your Info',
    'Payment Details',
    'Finalize Purchase',
    'Deposit',
    'Additional Docs',
  ];

  const fakeData = `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id
      hendrerit ligula. Morbi sit amet sagittis massa. Morbi in mollis lectus,
      eleifend mattis tellus. Aliquam erat volutpat. Etiam id magna et nunc
      consectetur tincidunt. Morbi rutrum felis sit amet magna rutrum egestas.
      Sed dictum dignissim posuere. Sed tempus posuere lectus, at placerat
      sapien convallis et. Curabitur felis arcu, dictum eget diam sodales,
      viverra scelerisque eros.`;

  return (
    <CheckoutLayout steps={steps} activeStep={2}>
      <Heading.Four>Who is the lucky owner?</Heading.Four>
      <hr />
      {[...Array(10)].map((i: number) => (
        <div key={i}>
          <Body.Regular>{fakeData}</Body.Regular>
          <hr />
        </div>
      ))}
    </CheckoutLayout>
  );
};

export default {
  title: 'Checkout/CheckoutLayout',
};
