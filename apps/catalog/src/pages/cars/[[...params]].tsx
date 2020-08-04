/* eslint-disable @typescript-eslint/camelcase */
import { useTheme } from '@material-ui/core/styles';
import { Brand, ThemeProvider } from '@vroom-web/ui';
import { NextPage, NextPageContext } from 'next';
import { parseCookies } from 'nookies';
import { stringify } from 'qs';
import React, { useEffect, useState } from 'react';
import { Experiment } from 'vroom-abtesting-sdk/types';

import experimentSDK, {
  showDefaultVariant,
} from 'src/integrations/experimentSDK';
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
  experiments: Experiment[];
}

const CarsPage: NextPage<Props> = ({
  brand,
  initialStoreState,
  experiments,
}) => {
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
      <Page experiments={experiments} name="Catalog" head={head}>
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
  const cookies = parseCookies(context);
  const marketingId = cookies['uuid'];
  const {
    query: {
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

  const { req, query } = context;
  const headerBrandKey = 'x-brand';
  const santanderKey = 'santander';
  const brandHeader = req && req.headers[headerBrandKey];
  const queryBrand = query.brand;

  const brand =
    (brandHeader || queryBrand) == santanderKey ? Brand.SANTANDER : Brand.VROOM;

  const geoQuery = query.geo;
  let geo: Coordinates | undefined;
  if (
    req &&
    req.headers['client-geo-latitude'] &&
    req.headers['client-geo-longitude']
  ) {
    geo = {
      latitude: parseFloat(req.headers['client-geo-latitude'] as string),
      longitude: parseFloat(req.headers['client-geo-longitude'] as string),
      accuracy: 2, //Don't need just to satisfy type
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    };
  } else if (geoQuery === 'detroit') {
    geo = {
      latitude: 72,
      longitude: 65,
      accuracy: 2, //Don't need just to satisfy type
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    };
  }

  const experiments =
    brand === Brand.VROOM
      ? await experimentSDK.getRunningExperiments(marketingId)
      : [];

  const geoLocationSortDefaultVariant = showDefaultVariant(
    'snd-catalog-sort-by-geo-location',
    experiments,
    context.query
  );
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
    geoLocationSortDefaultVariant,
    geo,
    filtersQueryParam
  );
  return {
    brand,
    initialStoreState,
    experiments,
  };
};

export default CarsPage;
