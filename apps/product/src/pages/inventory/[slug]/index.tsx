import { NextPage } from 'next';
import React from 'react';

import Inventory from 'src/modules/inventory';
import {
  getInitialInventoryStoreState,
  InventoryStore,
  InventoryStoreContext,
  InventoryStoreState,
} from 'src/modules/inventory/store';
import { Status } from 'src/networking/types';
import Page from 'src/Page';

export interface Props {
  initialState: InventoryStoreState;
  title: string;
}

const VehicleDetails: NextPage<Props> = (props: Props) => {
  const { initialState, title } = props;
  const store = new InventoryStore(initialState);
  const head = (
    <>
      <title>{title}</title>)
      <meta name="robots" content="noindex, nofollow" />
    </>
  );
  return (
    <Page name="Product Details" head={head}>
      <InventoryStoreContext.Provider value={store}>
        <Inventory />
      </InventoryStoreContext.Provider>
    </Page>
  );
};

VehicleDetails.getInitialProps = async ({ query }): Promise<Props> => {
  const slug = query.slug as string;
  const slugArray = slug.split('-');
  const vin = slugArray[slugArray.length - 1];
  const initialState = await getInitialInventoryStoreState(vin);

  let title = '';
  if (initialState.vehicleStatus === Status.SUCCESS) {
    const { year, make, model } = initialState.vehicle._source;
    title = `Used ${year} ${make} ${model} - Rocket Auto`;
  } else {
    title = 'Car Not Available - Rocket Auto';
  }

  return { initialState, title };
};

export default VehicleDetails;
