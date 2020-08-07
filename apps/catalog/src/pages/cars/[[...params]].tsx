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
import { Status } from 'src/networking/types';
import Page from 'src/Page';

interface Props {
  brand: Brand;
  experiments: Experiment[];
  indexPage: boolean;
  initialStoreState: InitialCarsStoreState;
}

const CarsPage: NextPage<Props> = ({
  brand,
  experiments,
  indexPage,
  initialStoreState,
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

  // DELTA-5
  // This is more complex than I would like.
  // TODO: investigate a better solution that will play nicely with chips as well.
  const getDisplayAttributesFromUrl = (): {
    bodyType?: string;
    make?: string;
    model?: string;
    year?: string;
  } => {
    if (!carsStore.filtersData) {
      return {};
    }

    let bodyType: string | undefined;
    if (
      carsStore.filtersData.bodytypes &&
      carsStore.filtersData.bodytypes.length > 0 &&
      carsStore.bodyTypes.length > 0
    ) {
      const bodyTypeSlug = carsStore.filtersData.bodytypes[0];
      const matchingBodyType = carsStore.bodyTypes.find(
        (bt) => bt.filtersDataValue === bodyTypeSlug
      );
      if (matchingBodyType) {
        bodyType = matchingBodyType.display;
      }
    }

    let make: string | undefined;
    let model: string | undefined;
    if (
      carsStore.filtersData.makesandmodels &&
      carsStore.filtersData.makesandmodels.length > 0 &&
      carsStore.makeBuckets &&
      carsStore.makeBuckets.length > 0
    ) {
      const makeAndModels = carsStore.filtersData.makesandmodels[0];
      const makeSlug = makeAndModels.makeSlug;
      const matchingMakeBucket = carsStore.makeBuckets.find(
        (mb) => mb.slug === makeSlug
      );
      if (matchingMakeBucket) {
        make = matchingMakeBucket.key;
        if (
          makeAndModels.modelSlugs &&
          makeAndModels.modelSlugs.length > 0 &&
          matchingMakeBucket.model_count.buckets.length > 0
        ) {
          const modelSlug = makeAndModels.modelSlugs[0];
          const matchingModelBucket = matchingMakeBucket.model_count.buckets.find(
            (mb) => mb.slug === modelSlug
          );
          if (matchingModelBucket) {
            model = matchingModelBucket.key;
          }
        }
      }
    }

    let year: string | undefined;
    if (carsStore.filtersData.year) {
      if (carsStore.filtersData.year.max !== carsStore.filtersData.year.min) {
        year = `${carsStore.filtersData.year.min}-${carsStore.filtersData.year.max}`;
      } else {
        year = `${carsStore.filtersData.year.max}`;
      }
    }

    return {
      bodyType,
      make,
      model,
      year,
    };
  };

  const { bodyType, make, model, year } = getDisplayAttributesFromUrl();

  const getTitle = (): string => {
    if (brand === Brand.SANTANDER) {
      return 'Shop Used Cars Online - Santander Consumer USA';
    }

    const template = (descriptor: string): string => {
      const pluralRegExp = new RegExp('^(.*)(s|z)$');
      const descriptorIsPlural = pluralRegExp.test(descriptor);
      const pluralDescriptor = descriptorIsPlural
        ? descriptor
        : `${descriptor}s`;
      return `Used ${pluralDescriptor} for Sale: Buy Online + Home Delivery | Vroom`;
    };

    if (make && model && year) {
      return template(`${year} ${make} ${model}`);
    }

    if (make && model) {
      return template(`${make} ${model}`);
    }

    if (make && year) {
      return template(`${year} ${make}`);
    }

    if (bodyType && make) {
      return template(`${make} ${bodyType}`);
    }

    if (make) {
      return template(make);
    }

    if (bodyType) {
      return template(`${bodyType}`);
    }

    return template('Cars');
  };
  const title = getTitle();

  const getDescription = (): string => {
    if (brand === Brand.SANTANDER) {
      return 'Buy your next car online with Santander Consumer USA. We offer high quality cars, easy car buying, & delivery anywhere in the USA.';
    }

    const descriptorArray = [make, model, bodyType].filter((item) => !!item);
    const descriptor =
      descriptorArray.length > 0 ? descriptorArray.join(' ') : 'car';

    return `Buy your next used ${descriptor} with Vroom. Browse our high-quality ${
      year || ''
    } ${descriptor} inventory, buy online, and have it delivered straight to you.`;
  };
  const description = getDescription();

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

  const { req, res, query } = context;
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
    geo,
    url
  );

  const getHasInventory = (): boolean => {
    if (initialStoreState.inventoryStatus !== Status.SUCCESS) {
      return false;
    }
    if (!initialStoreState.inventoryData) {
      return false;
    }
    return initialStoreState.inventoryData.hits.total !== 0;
  };
  const hasInventory = getHasInventory();

  if (res && !hasInventory) {
    res.statusCode = 404;
  }

  const indexPage = brand === Brand.SANTANDER ? true : false;

  return {
    brand,
    experiments,
    indexPage,
    initialStoreState,
  };
};

export default CarsPage;
