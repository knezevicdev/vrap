/* eslint-disable @typescript-eslint/camelcase */
import { useTheme } from '@material-ui/core/styles';
import {
  addAllModels,
  addBodyType,
  addModel,
  BodyType,
  FiltersData,
  getUrlFromFiltersData,
  MaxAndMin,
  setYear,
} from '@vroom-web/catalog-url-integration';
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

  // DELTA-5 / DELTA-56
  // This is more complex than I would like.
  // TODO: investigate a better solution that will play nicely with chips as well.
  const getAttributesFromUrl = (): {
    bodyTypeDisplay?: string;
    bodyTypeSlug?: BodyType;
    makeDisplay?: string;
    makeSlug?: string;
    modelDisplay?: string;
    modelSlug?: string;
    yearDisplay?: string;
    year?: MaxAndMin;
  } => {
    if (!carsStore.filtersData) {
      return {};
    }

    let bodyTypeDisplay: string | undefined;
    let bodyTypeSlug: BodyType | undefined;
    if (
      carsStore.filtersData.bodytypes &&
      carsStore.filtersData.bodytypes.length > 0 &&
      carsStore.bodyTypes.length > 0
    ) {
      const bodyTypeSlugToMatch = carsStore.filtersData.bodytypes[0];
      const matchingBodyType = carsStore.bodyTypes.find(
        (bt) => bt.filtersDataValue === bodyTypeSlugToMatch
      );
      if (matchingBodyType) {
        bodyTypeDisplay = matchingBodyType.display;
        bodyTypeSlug = matchingBodyType.filtersDataValue;
      }
    }

    let makeDisplay: string | undefined;
    let makeSlug: string | undefined;
    let modelDisplay: string | undefined;
    let modelSlug: string | undefined;
    if (
      carsStore.filtersData.makesandmodels &&
      carsStore.filtersData.makesandmodels.length > 0 &&
      carsStore.makeBuckets &&
      carsStore.makeBuckets.length > 0
    ) {
      const makeAndModels = carsStore.filtersData.makesandmodels[0];
      const makeSlugToMatch = makeAndModels.makeSlug;
      const matchingMakeBucket = carsStore.makeBuckets.find(
        (mb) => mb.slug === makeSlugToMatch
      );
      if (matchingMakeBucket) {
        makeDisplay = matchingMakeBucket.key;
        makeSlug = matchingMakeBucket.slug;
        if (
          makeAndModels.modelSlugs &&
          makeAndModels.modelSlugs.length > 0 &&
          matchingMakeBucket.model_count.buckets.length > 0
        ) {
          const modelSlugToMatch = makeAndModels.modelSlugs[0];
          const matchingModelBucket = matchingMakeBucket.model_count.buckets.find(
            (mb) => mb.slug === modelSlugToMatch
          );
          if (matchingModelBucket) {
            modelDisplay = matchingModelBucket.key;
            modelSlug = matchingModelBucket.slug;
          }
        }
      }
    }

    let yearDisplay: string | undefined;
    let year: MaxAndMin | undefined;
    if (carsStore.filtersData.year) {
      year = carsStore.filtersData.year;
      if (carsStore.filtersData.year.max !== carsStore.filtersData.year.min) {
        yearDisplay = `${carsStore.filtersData.year.min}-${carsStore.filtersData.year.max}`;
      } else {
        yearDisplay = `${carsStore.filtersData.year.max}`;
      }
    }

    return {
      bodyTypeDisplay,
      bodyTypeSlug,
      makeDisplay,
      makeSlug,
      modelDisplay,
      modelSlug,
      yearDisplay,
      year,
    };
  };

  const {
    bodyTypeDisplay,
    bodyTypeSlug,
    makeDisplay,
    makeSlug,
    modelDisplay,
    modelSlug,
    yearDisplay,
    year,
  } = getAttributesFromUrl();

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

    if (makeDisplay && modelDisplay && yearDisplay) {
      return template(`${yearDisplay} ${makeDisplay} ${modelDisplay}`);
    }

    if (makeDisplay && modelDisplay) {
      return template(`${makeDisplay} ${modelDisplay}`);
    }

    if (makeDisplay && yearDisplay) {
      return template(`${yearDisplay} ${makeDisplay}`);
    }

    if (bodyTypeDisplay && makeDisplay) {
      return template(`${makeDisplay} ${bodyTypeDisplay}`);
    }

    if (makeDisplay) {
      return template(makeDisplay);
    }

    if (bodyTypeDisplay) {
      return template(`${bodyTypeDisplay}`);
    }

    return template('Cars');
  };
  const title = getTitle();

  const getDescription = (): string => {
    if (brand === Brand.SANTANDER) {
      return 'Buy your next car online with Santander Consumer USA. We offer high quality cars, easy car buying, & delivery anywhere in the USA.';
    }

    const descriptorArray = [makeDisplay, modelDisplay, bodyTypeDisplay].filter(
      (item) => !!item
    );
    const descriptor =
      descriptorArray.length > 0 ? descriptorArray.join(' ') : 'car';

    return `Buy your next used ${descriptor} with Vroom. Browse our high-quality ${
      yearDisplay || ''
    } ${descriptor} inventory, buy online, and have it delivered straight to you.`;
  };
  const description = getDescription();

  const getCanonicalHref = (): string => {
    let filtersData: FiltersData = {};
    if (bodyTypeSlug) {
      filtersData = addBodyType(bodyTypeSlug, filtersData);
    }
    if (makeSlug && modelSlug) {
      filtersData = addModel(makeSlug, modelSlug, filtersData);
    } else if (makeSlug) {
      filtersData = addAllModels(makeSlug, filtersData);
    }
    if (year) {
      filtersData = setYear(year, filtersData);
    }
    // Return url without trailing slash.
    return getUrlFromFiltersData(filtersData).replace(/\/$/, '');
  };
  const canonicalHref = getCanonicalHref();

  const head = (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalHref} />
      {!indexPage && <meta name="robots" content="noindex, nofollow" />}
    </>
  );

  return (
    <ThemeProvider brand={brand}>
      <Page brand={brand} experiments={experiments} name="Catalog" head={head}>
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
