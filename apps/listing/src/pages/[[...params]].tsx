/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-nested-ternary */

import { useTheme } from '@material-ui/core/styles';
import {
  addAllModels,
  addBodyType,
  addModel,
  BodyType,
  FiltersData,
  getFiltersDataFromUrl,
  getUrlFromFiltersData,
  MaxAndMin,
  setYear,
} from '@vroom-web/catalog-url-integration';
import { Experiment } from '@vroom-web/experiment-sdk';
import {
  InvSearchNetworker,
  PostInventoryRequestData,
  SoldStatus,
} from '@vroom-web/inv-search-networking';
import { carSchema } from '@vroom-web/inv-search-networking/dist/types/Inventory';
import { ThemeProvider } from '@vroom-web/ui';
import { Brand, determineWhitelabel } from '@vroom-web/whitelabel';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import getConfig from 'next/config';
import { stringify } from 'qs';
import React, { useEffect, useState } from 'react';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import experimentSDK from 'src/integrations/experimentSDK';
import Cars from 'src/modules/cars';
import {
  INVENTORY_CARDS_PER_PAGE,
  POPULAR_CAR_LIMIT,
} from 'src/modules/cars/data';
import {
  CarsStore,
  CarsStoreContext,
  getPostInventoryRequestDataFromFilterData,
  InitialCarsStoreState,
} from 'src/modules/cars/store';
import { Status } from 'src/networking/types';
import Page from 'src/Page';
const {
  publicRuntimeConfig: { INVSEARCH_V3_URL, NAME, VERSION },
} = getConfig();
const invSearchNetworker = new InvSearchNetworker(INVSEARCH_V3_URL);

interface Props {
  brand: Brand;
  initialStoreState: InitialCarsStoreState;
}

const CarsPage: NextPage<Props> = ({ brand, initialStoreState }) => {
  // Persist store instance across URL updates.
  const [carsStore] = useState<CarsStore>(new CarsStore(initialStoreState));
  const [analyticsHandler] = useState<AnalyticsHandler>(new AnalyticsHandler());

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

  useEffect(() => {
    carsStore.fetchInventoryData();
  }, [carsStore]);

  useEffect(() => {
    experimentSDK
      .getAndLogExperimentClientSide('snd-cylinder-filters')
      .then((experiment) => {
        carsStore.setCylindersFilterExperiment(experiment);
      });
  }, [carsStore]);

  useEffect(() => {
    if (carsStore.cylinderFilterExperiment) {
      analyticsHandler.registerExperiment(carsStore.cylinderFilterExperiment);
    }
  }, [carsStore.cylinderFilterExperiment, analyticsHandler]);

  useEffect(() => {
    experimentSDK
      .getAndLogExperimentClientSide('snd-catalog-fuel-efficiency')
      .then((experiment) => {
        carsStore.setFuelEfficiencyFilterExperiment(experiment);
      });
  }, [carsStore]);

  useEffect(() => {
    if (carsStore.fuelEfficiencyFilterExperiment) {
      analyticsHandler.registerExperiment(
        carsStore.fuelEfficiencyFilterExperiment
      );
    }
  }, [carsStore.fuelEfficiencyFilterExperiment, analyticsHandler]);

  useEffect(() => {
    experimentSDK
      .getAndLogExperimentClientSide('snd-catalog-fuel-type-filter')
      .then((experiment) => {
        carsStore.setFuelTypeFilterExperiment(experiment);
      });
  }, [carsStore]);

  useEffect(() => {
    experimentSDK
      .getAndLogExperimentClientSide('snd-feature-filter')
      .then((experiment) => {
        carsStore.setFeaturesFilterExperiment(experiment);
      });
  }, [carsStore]);

  useEffect(() => {
    if (carsStore.fuelTypeFilterExperiment) {
      analyticsHandler.registerExperiment(carsStore.fuelTypeFilterExperiment);
    }
  }, [carsStore.fuelTypeFilterExperiment, analyticsHandler]);

  useEffect(() => {
    if (carsStore.featuresFilterExperiment) {
      analyticsHandler.registerExperiment(carsStore.featuresFilterExperiment);
    }
  }, [carsStore.featuresFilterExperiment, analyticsHandler]);

  const [resumeSearchExperiment, setResumeSearchExperiment] = useState<
    Experiment | undefined
  >();
  useEffect(() => {
    experimentSDK
      .getAndLogExperimentClientSide('delta-resume-search')
      .then((experiment) => setResumeSearchExperiment(experiment));
  }, []);
  useEffect(() => {
    if (resumeSearchExperiment) {
      analyticsHandler.registerExperiment(resumeSearchExperiment);
    }
  }, [resumeSearchExperiment, analyticsHandler]);
  useEffect(() => {
    const localStorageKey = 'listing_filters_data';
    if (!resumeSearchExperiment) {
      return;
    }
    if (resumeSearchExperiment.assignedVariant === 0) {
      if (localStorage.getItem(localStorageKey)) {
        localStorage.removeItem(localStorageKey);
      }
      return;
    }
    if (!carsStore.filtersData) {
      return;
    }
    if (Object.values(carsStore.filtersData).filter((i) => !!i).length > 0) {
      localStorage.setItem(
        localStorageKey,
        JSON.stringify(carsStore.filtersData)
      );
    }
  }, [carsStore.filtersData, resumeSearchExperiment]);

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

    if (brand === Brand.TDA) {
      return 'Shop Used Cars Online - Texas Direct Auto';
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

    if (brand === Brand.TDA) {
      return 'Buy your next car online with Texas Direct Auto. We offer high quality cars, easy car buying, & delivery anywhere in the USA.';
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
    const path = getUrlFromFiltersData(filtersData).replace(/\/$/, '');
    return `https://www.vroom.com${path}`;
  };
  const canonicalHref = getCanonicalHref();

  const head = (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalHref} />
    </>
  );

  return (
    <ThemeProvider brand={brand}>
      <Page name="Catalog" head={head}>
        <CarsStoreContext.Provider value={carsStore}>
          <Cars brand={brand} />
        </CarsStoreContext.Provider>
      </Page>
    </ThemeProvider>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context: GetServerSidePropsContext
) => {
  const {
    req: { url: _url },
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

  const { query } = context;
  context.res.setHeader('Cache-Control', '');
  const brand = determineWhitelabel(context);

  const url = typeof _url === 'string' ? (_url as string) : '';
  const filtersData = getFiltersDataFromUrl(url);

  const { isTitleQAPass } = query;
  const titleQuery = isTitleQAPass === 'true' ? true : undefined;

  const makesRequestData: PostInventoryRequestData = {
    fulldetails: false,
    limit: 1,
    sortdirection: 'asc',
    source: `${NAME}-${VERSION}`,
  };

  const popularCarsRequestData = {
    fulldetails: false,
    limit: POPULAR_CAR_LIMIT,
    sortdirection: 'asc',
    'sold-status': SoldStatus.FOR_SALE,
    source: `${NAME}-${VERSION}`,
    isTitleQAPass: titleQuery,
  };

  const makesStart = new Date().getTime();
  const makesR = await invSearchNetworker.postInventory(makesRequestData);
  const makesElapsed = new Date().getTime() - makesStart;
  console.log('{"MAKES_AND_MODELS_FILTERS_ms":' + makesElapsed + '}');

  const popularStart = new Date().getTime();
  const popularCarsR = await invSearchNetworker.postInventory(
    popularCarsRequestData
  );
  const popularElapsed = new Date().getTime() - popularStart;
  console.log('{"POPULAR_CARS_ms":' + popularElapsed + '}');

  const makes = makesR.data.aggregations.make_count.buckets;
  const popularCars = popularCarsR.data;

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

  const initialStoreState = {
    attributionQueryString,
    makes,
    cars: undefined,
    popularCars,
    filtersData,
    titleQuery,
  };

  // delete keys with value as undefined, as GSSP tries to serialize as JSON and errors out
  Object.keys(initialStoreState).forEach((key) => {
    if (initialStoreState[key as keyof InitialCarsStoreState] === undefined) {
      delete initialStoreState[key as keyof InitialCarsStoreState];
    }
  });

  return {
    props: {
      brand,
      initialStoreState,
    },
  };
};

export default CarsPage;
