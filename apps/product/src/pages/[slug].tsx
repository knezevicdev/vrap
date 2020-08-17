import { Brand, ThemeProvider } from '@vroom-web/ui';
import { NextPage } from 'next';
import getConfig from 'next/config';
import React from 'react';

import Inventory from 'src/modules/inventory';
import { BrandContext } from 'src/modules/inventory/BrandContext';
import {
  getInitialInventoryStoreState,
  InventoryStore,
  InventoryStoreContext,
  InventoryStoreState,
} from 'src/modules/inventory/store';
import { Status } from 'src/networking/types';
import Page from 'src/Page';

const { publicRuntimeConfig } = getConfig();

export interface Props {
  canonicalHref?: string;
  initialState: InventoryStoreState;
  title: string;
  brand: Brand;
}

const InventoryPage: NextPage<Props> = (props: Props) => {
  const { canonicalHref, initialState, title, brand } = props;
  const store = new InventoryStore(initialState);
  const head = (
    <>
      <title>{title}</title>)
      <meta name="robots" content="noindex, nofollow" />
      {canonicalHref && <link rel="canonical" href={canonicalHref} />}
    </>
  );
  return (
    <ThemeProvider brand={brand}>
      <Page brand={brand} name="Product Details" head={head}>
        <BrandContext.Provider value={brand}>
          <InventoryStoreContext.Provider value={store}>
            <Inventory />
          </InventoryStoreContext.Provider>
        </BrandContext.Provider>
      </Page>
    </ThemeProvider>
  );
};

InventoryPage.getInitialProps = async ({ query, res, req }): Promise<Props> => {
  const slug = query.slug as string;
  const slugArray = slug.split('-');
  const vin = slugArray[slugArray.length - 1];
  const initialState = await getInitialInventoryStoreState(vin);

  const headerBrandKey = 'x-brand';
  const santanderKey = 'santander';
  const brandHeader = req && req.headers[headerBrandKey];
  const queryBrand = query.brand;

  const brand =
    (brandHeader || queryBrand) == santanderKey ? Brand.SANTANDER : Brand.VROOM;

  let canonicalHref: string | undefined;
  let title = '';
  if (initialState.vehicleStatus === Status.SUCCESS) {
    const {
      year,
      make,
      makeSlug,
      model,
      modelSlug,
      listingPrice,
    } = initialState.vehicle._source;
    canonicalHref = `${publicRuntimeConfig.BASE_PATH}/${makeSlug}-${modelSlug}-${year}-${vin}`;
    const currencyFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    const price = currencyFormatter.format(listingPrice);
    title =
      brand === Brand.SANTANDER
        ? `Used ${year} ${make} ${model} - Santander Consumer USA`
        : `Used ${year} ${make} ${model} For Sale (${price}) | Vroom`;
  } else {
    title =
      brand === Brand.SANTANDER
        ? 'Car Not Available - Santander Consumer USA'
        : 'Car Not Available | Vroom';
    if (res) {
      res.statusCode = 404;
    }
  }

  return { canonicalHref, initialState, title, brand };
};

export default InventoryPage;
