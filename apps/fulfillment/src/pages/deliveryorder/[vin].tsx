import { NextPage } from 'next';
import React from 'react';

import DeliveryOrder from 'src/modules/deliveryOrder';
import {
  DeliveryOrderStore,
  DeliveryOrderStoreContext,
  DeliveryOrderStoreState,
  getInitialDeliveryOrderStoreState,
} from 'src/modules/deliveryOrder/store';
import Page from 'src/Page';

interface Props {
  description: string;
  title: string;
  initialState: DeliveryOrderStoreState;
}

const DeliveryOrderPage: NextPage<Props> = ({
  description,
  title,
  initialState,
}) => {
  const head = (
    <>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
    </>
  );

  const store = new DeliveryOrderStore(initialState);

  return (
    <Page name="Home" head={head}>
      <DeliveryOrderStoreContext.Provider value={store}>
        <DeliveryOrder />
      </DeliveryOrderStoreContext.Provider>
    </Page>
  );
};

DeliveryOrderPage.getInitialProps = async ({ query }): Promise<Props> => {
  const vin = query.vin as string;

  const title = 'Vroom Fulfillment';
  const description = '';
  const initialState = await getInitialDeliveryOrderStoreState(vin);

  return { description, title, initialState };
};

export default DeliveryOrderPage;
