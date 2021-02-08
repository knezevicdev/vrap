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
  return (
    <CheckoutLayout steps={steps} activeStep={2}>
      <Heading.Four>Who is the lucky owner?</Heading.Four>
      <hr />
      <Body.Regular>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id
        hendrerit ligula. Morbi sit amet sagittis massa. Morbi in mollis lectus,
        eleifend mattis tellus. Aliquam erat volutpat. Etiam id magna et nunc
        consectetur tincidunt. Morbi rutrum felis sit amet magna rutrum egestas.
        Sed dictum dignissim posuere. Sed tempus posuere lectus, at placerat
        sapien convallis et. Curabitur felis arcu, dictum eget diam sodales,
        viverra scelerisque eros.
        <hr />
        Praesent blandit dapibus tellus, nec consequat ipsum pretium sit amet.
        Cras egestas gravida facilisis. Integer sed sapien sit amet est rutrum
        facilisis. Nullam magna dolor, pretium non erat at, congue pretium diam.
        Nunc tempus odio sem, nec pharetra ex luctus eget. Sed gravida, eros
        eget sagittis feugiat, metus lacus pulvinar velit, et cursus velit magna
        quis nulla. Fusce elementum eros sit amet mollis molestie. Integer
        tincidunt purus turpis.
        <hr />
        Praesent blandit dapibus tellus, nec consequat ipsum pretium sit amet.
        Cras egestas gravida facilisis. Integer sed sapien sit amet est rutrum
        facilisis. Nullam magna dolor, pretium non erat at, congue pretium diam.
        Nunc tempus odio sem, nec pharetra ex luctus eget. Sed gravida, eros
        eget sagittis feugiat, metus lacus pulvinar velit, et cursus velit magna
        quis nulla. Fusce elementum eros sit amet mollis molestie. Integer
        tincidunt purus turpis.
        <hr />
        Praesent blandit dapibus tellus, nec consequat ipsum pretium sit amet.
        Cras egestas gravida facilisis. Integer sed sapien sit amet est rutrum
        facilisis. Nullam magna dolor, pretium non erat at, congue pretium diam.
        Nunc tempus odio sem, nec pharetra ex luctus eget. Sed gravida, eros
        eget sagittis feugiat, metus lacus pulvinar velit, et cursus velit magna
        quis nulla. Fusce elementum eros sit amet mollis molestie. Integer
        tincidunt purus turpis.
        <hr />
        Praesent blandit dapibus tellus, nec consequat ipsum pretium sit amet.
        Cras egestas gravida facilisis. Integer sed sapien sit amet est rutrum
        facilisis. Nullam magna dolor, pretium non erat at, congue pretium diam.
        Nunc tempus odio sem, nec pharetra ex luctus eget. Sed gravida, eros
        eget sagittis feugiat, metus lacus pulvinar velit, et cursus velit magna
        quis nulla. Fusce elementum eros sit amet mollis molestie. Integer
        tincidunt purus turpis.
        <hr />
        Praesent blandit dapibus tellus, nec consequat ipsum pretium sit amet.
        Cras egestas gravida facilisis. Integer sed sapien sit amet est rutrum
        facilisis. Nullam magna dolor, pretium non erat at, congue pretium diam.
        Nunc tempus odio sem, nec pharetra ex luctus eget. Sed gravida, eros
        eget sagittis feugiat, metus lacus pulvinar velit, et cursus velit magna
        quis nulla. Fusce elementum eros sit amet mollis molestie. Integer
        tincidunt purus turpis.
        <hr />
        Praesent blandit dapibus tellus, nec consequat ipsum pretium sit amet.
        Cras egestas gravida facilisis. Integer sed sapien sit amet est rutrum
        facilisis. Nullam magna dolor, pretium non erat at, congue pretium diam.
        Nunc tempus odio sem, nec pharetra ex luctus eget. Sed gravida, eros
        eget sagittis feugiat, metus lacus pulvinar velit, et cursus velit magna
        quis nulla. Fusce elementum eros sit amet mollis molestie. Integer
        tincidunt purus turpis.
      </Body.Regular>
      <hr />
    </CheckoutLayout>
  );
};

export default {
  title: 'Checkout/CheckoutLayout',
};
