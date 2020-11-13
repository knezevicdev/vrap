import { Brand, ThemeProvider } from '@vroom-web/ui';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import getConfig from 'next/config';
import React from 'react';

import { analyticsHandler } from 'src/integrations/AnalyticsHandler';
import experimentSDK from 'src/integrations/experimentSDK';
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
import { determineWhitelabel } from 'src/utils/utils';

const { publicRuntimeConfig } = getConfig();

export interface Props {
  canonicalHref: string | null;
  initialState: InventoryStoreState;
  title: string;
  brand: Brand;
  vin: string;
}

const InventoryPage: NextPage<Props> = (props: Props) => {
  const { canonicalHref, initialState, title, brand, vin } = props;
  const store = new InventoryStore(initialState);

  React.useEffect(() => {
    experimentSDK
      .getAndLogExperimentClientSide('snd-pdp-vin-cluster-similar-vehicle')
      .then((experiment) => {
        if (!experiment) {
          store.setSimilarStatus(initialState.similarStatus);
          return;
        }
        analyticsHandler.registerExperiment(experiment);
        if (experiment.assignedVariant === 0) {
          store.setSimilarStatus(initialState.similarStatus);
          return;
        }
        store.getSimilar(vin, true);
      });
  }, [initialState.similarStatus, store, vin]);

  const head = (
    <>
      <title>{title}</title>)
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

export const getServerSideProps: GetServerSideProps<Props> = async (
  context: GetServerSidePropsContext
) => {
  const { res, query } = context;
  const slug = query.slug as string;
  const slugArray = slug.split('-');
  const vin = slugArray[slugArray.length - 1];

  const brand = determineWhitelabel(context);

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
    if (brand === Brand.SANTANDER) {
      return `${yearmakemodel} - Santander Consumer USA`;
    }
    if (brand === Brand.TDA) {
      return `${yearmakemodel} - Texas Direct Auto`;
    }
    return `${yearmakemodel} For Sale (${price}) | Vroom`;
  };
  const getCarNotAvailableTitle = (): string => {
    if (brand === Brand.SANTANDER) {
      return 'Car Not Available - Santander Consumer USA';
    }
    if (brand === Brand.TDA) {
      return 'Car Not Available - Texas Direct Auto';
    }
    return 'Car Not Available | Vroom';
  };

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
    title = getTitle(year, make, model, price);
  } else {
    title = getCarNotAvailableTitle();
    if (res) {
      res.statusCode = 404;
    }
  }

  return { props: { canonicalHref, initialState, title, brand, vin } };
};

export default InventoryPage;
