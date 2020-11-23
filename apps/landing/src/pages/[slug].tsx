import { Brand, ThemeProvider } from '@vroom-web/ui';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import getConfig from 'next/config';
import React from 'react';

import Vehicle from 'src/modules/inventory';
import {
  getInitialInventoryStoreState,
  InventoryStore,
  InventoryStoreContext,
  InventoryStoreState,
  Status,
} from 'src/modules/inventory/store/store';
import Page from 'src/modules/Page';

const { publicRuntimeConfig } = getConfig();

export interface Props {
  canonicalHref: string | null;
  initialState: InventoryStoreState;
  title: string;
  vin: string;
}

const VinPage: NextPage<Props> = (props: Props) => {
  const { canonicalHref, initialState, title } = props;
  const store = new InventoryStore(initialState);

  const head = (
    <>
      <title>{title}</title>)
      {canonicalHref && <link rel="canonical" href={canonicalHref} />}
    </>
  );
  return (
    <ThemeProvider brand={Brand.VROOM}>
      <Page name="Product Details" head={head}>
        <InventoryStoreContext.Provider value={store}>
          <Vehicle />
        </InventoryStoreContext.Provider>
      </Page>
    </ThemeProvider>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context: GetServerSidePropsContext
) => {
  const { res, query } = context;
  const vin = query.slug as string;

  context.res.setHeader('Cache-Control', '');

  const initialState = await getInitialInventoryStoreState(vin);

  let canonicalHref: string | null = null;
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

  if (initialState.vehicleStatus === Status.SUCCESS && initialState.vehicle) {
    const { year, make, model, listingPrice } = initialState.vehicle._source;
    canonicalHref = `https://www.vroom.com${publicRuntimeConfig.BASE_PATH}/${vin}`;
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

  return { props: { canonicalHref, initialState, title, vin } };
};

export default VinPage;
