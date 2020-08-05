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
  description: string;
  experiments: Experiment[];
  indexPage: boolean;
  initialStoreState: InitialCarsStoreState;
  title: string;
}

const CarsPage: NextPage<Props> = ({
  brand,
  description,
  experiments,
  indexPage,
  initialStoreState,
  title,
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

  const head = (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {!indexPage && <meta name="robots" content="noindex, nofollow" />}
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
    asPath,
    query: {
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

  const title =
    brand === Brand.SANTANDER
      ? 'Shop Used Cars Online - Santander Consumer USA'
      : 'Buy Low-Mileage Used Cars & Trucks Online - Vroom';

  const description =
    brand === Brand.SANTANDER
      ? 'Buy your next car online with Santander Consumer USA. We offer high quality cars, easy car buying, & delivery anywhere in the USA.'
      : 'Buy your next car online with Vroom. We offer certified used cars for sale, no haggle car buying, full warranties and home shipping anywhere in the USA.';

  const indexPage = brand === Brand.SANTANDER ? true : false;

  const experiments =
    brand === Brand.VROOM
      ? await experimentSDK.getRunningExperiments(marketingId)
      : [];

  const geoLocationSortDefaultVariant = showDefaultVariant(
    'snd-catalog-sort-by-geo-location',
    experiments,
    context.query
  );

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

  // DELTA-4
  // Based on testing it seems that "asPath" is always a string,
  // but just to be safe, I'm covering the undefined case.
  const url = typeof asPath === 'string' ? (asPath as string) : '';

  const initialStoreState = await getInitialCarsStoreState(
    attributionQueryString,
    geoLocationSortDefaultVariant,
    url
  );
  return {
    brand,
    description,
    experiments,
    indexPage,
    initialStoreState,
    title,
  };
};

export default CarsPage;
