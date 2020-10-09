import { Brand, ThemeProvider } from '@vroom-web/ui';
import { NextPage, NextPageContext } from 'next';
import getConfig from 'next/config';
import { parseCookies } from 'nookies';
import React from 'react';
import { Experiment } from 'vroom-abtesting-sdk/types';

import experimentSDK, {
  showDefaultVariant,
} from 'src/integrations/experimentSDK';
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
  experiments: Experiment[];
}

const InventoryPage: NextPage<Props> = (props: Props) => {
  const { canonicalHref, initialState, title, brand, experiments } = props;
  const store = new InventoryStore(initialState);
  const head = (
    <>
      <title>{title}</title>)
      {canonicalHref && <link rel="canonical" href={canonicalHref} />}
    </>
  );
  return (
    <ThemeProvider brand={brand}>
      <Page
        brand={brand}
        experiments={experiments}
        name="Product Details"
        head={head}
      >
        <BrandContext.Provider value={brand}>
          <InventoryStoreContext.Provider value={store}>
            <Inventory />
          </InventoryStoreContext.Provider>
        </BrandContext.Provider>
      </Page>
    </ThemeProvider>
  );
};

InventoryPage.getInitialProps = async (
  context: NextPageContext
): Promise<Props> => {
  const cookies = parseCookies(context);
  const marketingId = cookies['uuid'];
  const { req, res, query } = context;
  const slug = query.slug as string;
  const slugArray = slug.split('-');
  const vin = slugArray[slugArray.length - 1];

  const headerBrandKey = 'x-brand';
  const santanderKey = 'santander';
  const brandHeader = req && req.headers[headerBrandKey];
  const queryBrand = query.brand;

  const brand =
    (brandHeader || queryBrand) == santanderKey ? Brand.SANTANDER : Brand.VROOM;

  const experiments =
    brand === Brand.VROOM
      ? await experimentSDK.getRunningExperiments(marketingId)
      : [];
  const vinClusterDefaultVariant = showDefaultVariant(
    'snd-pdp-vin-cluster-similar-vehicle',
    experiments,
    context.query
  );
  const initialState = await getInitialInventoryStoreState(
    vin,
    vinClusterDefaultVariant
  );
  let canonicalHref: string | undefined;
  let title = '';
  if (initialState.vehicleStatus === Status.SUCCESS && initialState.vehicle) {
    const {
      year,
      make,
      makeSlug,
      model,
      modelSlug,
      listingPrice,
    } = initialState.vehicle._source;
    canonicalHref = `https://www.vroom.com${publicRuntimeConfig.BASE_PATH}/${makeSlug}-${modelSlug}-${year}-${vin}`;
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

  return { canonicalHref, initialState, title, brand, experiments };
};

export default InventoryPage;
