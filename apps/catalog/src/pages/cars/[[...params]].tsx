/* eslint-disable @typescript-eslint/camelcase */
import { useTheme } from '@material-ui/core/styles';
import { Brand, ThemeProvider } from '@vroom-web/ui';
import { NextPage, NextPageContext } from 'next';
import { stringify } from 'qs';
import React, { useEffect, useState } from 'react';

import Cars from 'src/modules/cars';
import { BrandContext } from 'src/modules/cars/BrandContext';
import {
  CarsStore,
  CarsStoreContext,
  getInitialCarsStoreState,
  InitialCarsStoreState,
} from 'src/modules/cars/store';
import Page from 'src/Page';

interface Props {
  brand: Brand;
  initialStoreState: InitialCarsStoreState;
}

const CarsPage: NextPage<Props> = ({ brand, initialStoreState }) => {
  // Persist store instance across URL updates.
  const [carsStore] = useState<CarsStore>(new CarsStore(initialStoreState));

  /* FIT-307. This effect allows the filters panel to be initially closed
  on mobile, and initially open on desktop. */
  const theme = useTheme();
  useEffect(() => {
    const mql = window.matchMedia(
      `(min-width: ${theme.breakpoints.values.sm}px)`
    );
    if (mql.matches) {
      carsStore.setAreFiltersOpen(true);
    }
  }, [carsStore, theme]);

  const title = 'Buy Low-Mileage Used Cars & Trucks Online - Vroom';
  const description =
    'Buy your next car online with Vroom. We offer certified used cars for sale, no haggle car buying, full warranties and home shipping anywhere in the USA.';

  const head = (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="noindex, nofollow" />
    </>
  );

  return (
    <ThemeProvider brand={brand}>
      <Page name="Catalog" head={head}>
        <BrandContext.Provider value={brand}>
          <CarsStoreContext.Provider value={carsStore}>
            <Cars />
          </CarsStoreContext.Provider>
        </BrandContext.Provider>
      </Page>
    </ThemeProvider>
  );
};

CarsPage.getInitialProps = async (context: NextPageContext): Promise<Props> => {
  const {
    query: {
      brand: brandQueryParam,
      filters,
      gclid,
      subid,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      utm_keyword,
      utm_subsource,
      utm_site,
    },
  } = context;

  // FIT-570
  // TODO: replace this mechanism with the actual one.
  // Some data should come from ctx.req, rather than from query.
  const brand = brandQueryParam === 'santander' ? Brand.SANTANDER : Brand.VROOM;

  const filtersQueryParam =
    typeof filters === 'string' ? (filters as string) : undefined;

  // FIT-583
  // Persist key attribution query params across navigation.
  // This is a stopgap so that vlassic attributuion works.
  // We should come back and remove this when a better attribution system is in place.
  const attributionQueryString = stringify(
    {
      gclid,
      subid,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      utm_keyword,
      utm_subsource,
      utm_site,
    },
    {
      addQueryPrefix: false,
    }
  );
  const initialStoreState = await getInitialCarsStoreState(
    attributionQueryString,
    filtersQueryParam
  );
  return {
    brand,
    initialStoreState,
  };
};

export default CarsPage;
