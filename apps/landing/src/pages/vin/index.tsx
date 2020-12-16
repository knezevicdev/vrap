/* eslint-disable @typescript-eslint/camelcase */
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

import Vehicle from 'src/modules/V2V';
import {
  getInitialInventoryStoreState,
  InventoryStore,
  InventoryStoreContext,
  InventoryStoreState,
  Status,
} from 'src/modules/V2V/store/inventoryStore';

export interface Props {
  initialState: InventoryStoreState;
  title: string;
  valuePropOrderKey: string | null;
}

const VinPage: NextPage<Props> = (props: Props) => {
  const { initialState, title, valuePropOrderKey } = props;
  const store = new InventoryStore(initialState);

  const head = (
    <>
      <title>{title}</title>
      <meta name="robots" content="noindex, nofollow"></meta>
    </>
  );

  return (
    <>
      <Head>{head}</Head>
      <InventoryStoreContext.Provider value={store}>
        <Vehicle valuePropOrderKey={valuePropOrderKey} />
      </InventoryStoreContext.Provider>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context: GetServerSidePropsContext
) => {
  const {
    res,
    query: { vehicle_vin, vit_proposition },
  } = context;

  const valuePropOrderKey: string | null = vit_proposition
    ? (vit_proposition as string)
    : null;

  const vin = vehicle_vin ? (vehicle_vin as string) : '';

  context.res.setHeader('Cache-Control', '');

  let title = '';

  const getTitle = (
    year: number,
    make: string,
    model: string,
    price: string
  ): string => {
    const yearmakemodel = `Used ${year} ${make} ${model}`;
    return `${yearmakemodel} For Sale (${price}) | Vroom`;
  };
  const getCarNotAvailableTitle = (): string => {
    return 'Car Not Available | Vroom';
  };

  const initialState = await getInitialInventoryStoreState(vin);

  if (initialState.vehicleStatus === Status.SUCCESS && initialState.vehicle) {
    const { year, make, model, listingPrice } = initialState.vehicle._source;

    const currencyFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    const price = currencyFormatter.format(listingPrice);
    title = getTitle(year, make, model, price);
  } else {
    title = getCarNotAvailableTitle();
    if (res) {
      res.statusCode = 404;
    }
  }

  return { props: { initialState, title, valuePropOrderKey } };
};

export default VinPage;
