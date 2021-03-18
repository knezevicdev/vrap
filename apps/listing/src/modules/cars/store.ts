import {
  Filters,
  FiltersData,
  getUrlFromFiltersData,
} from '@vroom-web/catalog-url-integration';
import { Experiment } from '@vroom-web/experiment-sdk';
import {
  Inventory,
  InvSearchNetworker,
  MakeBucket,
  PostInventoryRequestData,
  SoldStatus,
} from '@vroom-web/inv-search-networking';
import { action, computed, observable, runInAction } from 'mobx';
import getConfig from 'next/config';
import Router from 'next/router';
import { createContext } from 'react';

import {
  BodyType,
  BodyTypeAPI,
  bodyTypes,
  CabType,
  CabTypeAPI,
  cabTypes,
  Color,
  ColorAPI,
  colors,
  Cylinder,
  CylinderApi,
  cylinders,
  DriveType,
  DriveTypeAPI,
  driveTypes,
  FuelType,
  FuelTypeAPI,
  fuelTypes,
  INVENTORY_CARDS_PER_PAGE,
  POPULAR_CAR_LIMIT,
  PopularFeature,
  PopularFeatureApi,
  popularFeatures,
  Sort,
  SortAPIBy,
  SortAPIDirection,
  sorts,
  TestDrive,
  TestDriveAPI,
  testDrives,
  Transmission,
  TransmissionAPI,
  transmissions,
} from './data';

import { Status } from 'src/networking/types';

const { publicRuntimeConfig } = getConfig();

export interface InitialCarsStoreState {
  attributionQueryString: string;
  makes?: MakeBucket[];
  cars?: Inventory;
  popularCars?: Inventory;
  filtersData?: FiltersData;
  titleQuery?: boolean;
  zipCode?: string | string[];
}

export const getBodyTypeRequestData = (
  filtersData?: FiltersData
): BodyTypeAPI[] | undefined => {
  if (!filtersData) {
    return undefined;
  }
  const filtersDataBodyTypes = filtersData[Filters.BODY_TYPES];
  if (!filtersDataBodyTypes || !bodyTypes) {
    return undefined;
  }
  const bodytype: BodyTypeAPI[] = [];
  filtersDataBodyTypes.forEach((filterDataBodyType) => {
    const matchingBodyType = bodyTypes.find(
      (bt) => bt.filtersDataValue === filterDataBodyType
    );
    if (matchingBodyType) {
      bodytype.push(matchingBodyType.api);
    }
  });
  return bodytype;
};

export const getCabTypeRequestData = (
  filtersData?: FiltersData
): CabTypeAPI[] | undefined => {
  if (!filtersData) {
    return undefined;
  }
  const filtersDataCabTypes = filtersData[Filters.CAB_TYPE];
  if (!filtersDataCabTypes || !cabTypes) {
    return undefined;
  }
  const cabtype: CabTypeAPI[] = [];
  filtersDataCabTypes.forEach((filterDataCabType) => {
    const matchingCabType = cabTypes.find(
      (bt) => bt.filtersDataValue === filterDataCabType
    );
    if (matchingCabType) {
      cabtype.push(matchingCabType.api);
    }
  });
  return cabtype;
};

export const getColorRequestData = (
  filtersData?: FiltersData
): ColorAPI[] | undefined => {
  if (!filtersData) {
    return undefined;
  }
  const filtersDataColors = filtersData[Filters.COLORS];
  if (!filtersDataColors || !colors) {
    return undefined;
  }
  const color: ColorAPI[] = [];
  filtersDataColors.forEach((filterDataColor) => {
    const matchingColor = colors.find(
      (c) => c.filtersDataValue === filterDataColor
    );
    if (matchingColor) {
      color.push(matchingColor.api);
    }
  });
  return color;
};

export const getDriveTypeRequestData = (
  filtersData?: FiltersData
): DriveTypeAPI[] | undefined => {
  if (!filtersData) {
    return undefined;
  }
  const filtersDataDriveType = filtersData[Filters.DRIVE_TYPE];
  if (!filtersDataDriveType || !driveTypes) {
    return undefined;
  }
  const driveType: DriveTypeAPI[] = [];
  filtersDataDriveType.forEach((filtersDataDriveType) => {
    const matchingDriveType = driveTypes.find(
      (dt) => dt.filtersDataValue === filtersDataDriveType
    );
    if (matchingDriveType) {
      driveType.push(matchingDriveType.api);
    }
  });
  return driveType;
};

export const getCylinderRequestData = (
  filtersData?: FiltersData
): CylinderApi[] | undefined => {
  if (!filtersData) {
    return undefined;
  }
  const filtersDataCylinder = filtersData[Filters.CYLINDERS];
  if (!filtersDataCylinder || !cylinders) {
    return undefined;
  }
  const cylinder: CylinderApi[] = [];
  filtersDataCylinder.forEach((filtersDataCylinder) => {
    const matchingCylinder = cylinders.find(
      (cylinder) => cylinder.filtersDataValue === filtersDataCylinder
    );
    if (matchingCylinder && matchingCylinder.api) {
      cylinder.push(matchingCylinder.api);
    }
  });
  return cylinder;
};

export const getFuelTypeRequestData = (
  filtersData?: FiltersData
): FuelTypeAPI[] | undefined => {
  if (!filtersData) {
    return undefined;
  }
  const filtersDataFuelType = filtersData[Filters.FUEL_TYPE];
  if (!filtersDataFuelType || !fuelTypes) {
    return undefined;
  }
  const fuelType: FuelTypeAPI[] = [];
  filtersDataFuelType.forEach((filtersDataFuelType) => {
    const matchingFuelType = fuelTypes.find(
      (fuelType) => fuelType.filtersDataValue === filtersDataFuelType
    );
    if (matchingFuelType && matchingFuelType.api) {
      fuelType.push(matchingFuelType.api);
    }
  });
  return fuelType;
};

export const getMakeAndModelRequestData = (
  filtersData?: FiltersData
): {
  makeSlug?: string[];
  modelSlug?: string[];
} => {
  if (!filtersData) {
    return {
      makeSlug: undefined,
      modelSlug: undefined,
    };
  }
  const filtersDataMakesAndModels = filtersData[Filters.MAKE_AND_MODELS];
  if (!filtersDataMakesAndModels) {
    return {
      makeSlug: undefined,
      modelSlug: undefined,
    };
  }
  const makeSlug: string[] = [];
  const modelSlug: string[] = [];
  filtersDataMakesAndModels.forEach((makeAndModels) => {
    if (makeAndModels.modelSlugs) {
      modelSlug.push(...makeAndModels.modelSlugs);
    } else {
      makeSlug.push(makeAndModels.makeSlug);
    }
  });
  return {
    makeSlug,
    modelSlug,
  };
};

export const getOffsetRequestData = (
  filtersData?: FiltersData
): number | undefined => {
  if (!filtersData) {
    return undefined;
  }
  const filtersDataPage = filtersData[Filters.PAGE];
  if (!filtersDataPage) {
    return undefined;
  }
  return (filtersDataPage - 1) * INVENTORY_CARDS_PER_PAGE;
};

export const getPopularFeaturesRequestData = (
  filtersData?: FiltersData
): PopularFeatureApi[] | undefined => {
  if (!filtersData) {
    return undefined;
  }
  const filtersDataPopularFeatures = filtersData[Filters.POPULAR_FEATURES];
  if (!filtersDataPopularFeatures || !popularFeatures) {
    return undefined;
  }
  const popularFeature: PopularFeatureApi[] = [];
  filtersDataPopularFeatures.forEach((filtersDataPopularFeatures) => {
    const matchingFeature = popularFeatures.find(
      (feature) => feature.filtersDataValue === filtersDataPopularFeatures
    );
    if (matchingFeature && matchingFeature.api) {
      popularFeature.push(matchingFeature.api as PopularFeatureApi);
    }
  });
  return popularFeature.flat();
};

export const getSortRequestData = (
  filtersData?: FiltersData,
  geoShippingExperimentAssignedVariant?: 0 | 1
): {
  sortby?: SortAPIBy;
  sortdirection?: SortAPIDirection;
} => {
  const sortByGeoOrRandom =
    geoShippingExperimentAssignedVariant === 1
      ? SortAPIBy.RANDOM
      : SortAPIBy.GEO;
  if (!filtersData) {
    return {
      sortby: sortByGeoOrRandom,
      sortdirection: undefined,
    };
  }
  const filtersDataSort = filtersData[Filters.SORT];
  if (!filtersDataSort) {
    return {
      sortby: sortByGeoOrRandom,
      sortdirection: undefined,
    };
  }
  const matchingSort = sorts.find(
    (s) =>
      s.filtersDataByValue === filtersDataSort.by &&
      s.filtersDataDirectionValue === filtersDataSort.direction
  );
  if (!matchingSort) {
    return {
      sortby: undefined,
      sortdirection: undefined,
    };
  }
  return {
    sortby: matchingSort.apiBy,
    sortdirection: matchingSort.apiDirection,
  };
};

export const getTestDriveOnlyRequestData = (
  filtersData?: FiltersData
): boolean | undefined => {
  if (!filtersData) {
    return undefined;
  }
  const filtersDataTestDrive = filtersData[Filters.TEST_DRIVE];
  if (!filtersDataTestDrive) {
    return undefined;
  }
  const matchingTestDrive = testDrives.find(
    (t) => t.filtersDataValue === filtersDataTestDrive
  );
  if (!matchingTestDrive) {
    return undefined;
  }
  return matchingTestDrive.api === TestDriveAPI.AVAILABLE;
};

export const getTransmissionRequestData = (
  filtersData?: FiltersData
): TransmissionAPI[] | undefined => {
  if (!filtersData) {
    return undefined;
  }
  const filtersDataTransmission = filtersData[Filters.TRANSMISSION];
  if (!filtersDataTransmission) {
    return undefined;
  }
  const matchingTransmission = transmissions.find(
    (t) => t.filtersDataValue === filtersDataTransmission
  );
  if (!matchingTransmission) {
    return undefined;
  }
  return [matchingTransmission.api];
};

export const getPostInventoryRequestDataFromFilterData = (
  filtersData?: FiltersData,
  geoShippingExperiment?: Experiment,
  shippingOrigins?: string[]
): PostInventoryRequestData => {
  const geoShippingExperimentAssignedVariant =
    geoShippingExperiment?.assignedVariant;
  const bodytype = getBodyTypeRequestData(filtersData);
  const cabtype = getCabTypeRequestData(filtersData);
  const color = getColorRequestData(filtersData);
  const cylinders = getCylinderRequestData(filtersData);
  const drivetype = getDriveTypeRequestData(filtersData);
  const fuelType = getFuelTypeRequestData(filtersData);
  const { makeSlug, modelSlug } = getMakeAndModelRequestData(filtersData);
  const offset = getOffsetRequestData(filtersData);
  const popularFeatures = getPopularFeaturesRequestData(filtersData);
  const { sortby, sortdirection } = getSortRequestData(
    filtersData,
    geoShippingExperimentAssignedVariant
  );
  const testdriveonly = getTestDriveOnlyRequestData(filtersData);
  const transmissionDetail = getTransmissionRequestData(filtersData);

  return {
    bodytype,
    cabtype,
    color,
    drivetype,
    makeSlug,
    miles: filtersData ? filtersData[Filters.MILES] : undefined,
    modelSlug,
    offset,
    price: filtersData ? filtersData[Filters.PRICE] : undefined,
    searchall: filtersData ? filtersData[Filters.SEARCH] : undefined,
    sortby,
    sortdirection,
    testdriveonly,
    transmissionDetail,
    year: filtersData ? filtersData[Filters.YEAR] : undefined,
    fuelType,
    cylinders,
    cylindersShowOther:
      (filtersData && filtersData[Filters.OTHER_CYLINDERS]) || undefined,
    optionalFeatures: popularFeatures,
    combinedMpg: filtersData ? filtersData[Filters.FUEL_EFFICIENCY] : undefined,
    ...(geoShippingExperimentAssignedVariant === 1 && {
      locationBoost: shippingOrigins,
    }),
  };
};

export class CarsStore {
  private readonly invSearchNetworker: InvSearchNetworker;
  private readonly isTitleQAPass?: boolean;
  private readonly zipCode?: string | string[];

  readonly attributionQueryString: string = '';
  readonly geoLocationSortDefaultVariant: boolean = true;
  readonly inventoryCardsPerPage: number = INVENTORY_CARDS_PER_PAGE;
  readonly bodyTypes: BodyType[] = bodyTypes;
  readonly cabTypes: CabType[] = cabTypes;
  readonly colors: Color[] = colors;
  readonly driveTypes: DriveType[] = driveTypes;
  readonly cylinders: Cylinder[] = cylinders;
  readonly fuelTypes: FuelType[] = fuelTypes;
  readonly popularFeatures: PopularFeature[] = popularFeatures;
  readonly sorts: Sort[] = sorts;
  readonly testDrives: TestDrive[] = testDrives;
  readonly transmissions: Transmission[] = transmissions;

  @observable filtersData?: FiltersData;

  @observable makeBuckets?: MakeBucket[];
  @observable makeBucketsStatus: Status = Status.INITIAL;

  @observable inventoryData?: Inventory;
  @observable inventoryStatus: Status = Status.FETCHING;
  @computed get hasInventory(): boolean {
    if (this.inventoryData) {
      return this.inventoryData.hits.total !== 0;
    }
    return false;
  }

  @observable popularCarsData?: Inventory;
  @observable popularCarsStatus: Status = Status.INITIAL;
  @computed get hasPopularCars(): boolean {
    if (this.popularCarsData) {
      return this.popularCarsData.hits.total !== 0;
    }
    return false;
  }

  @observable shippingOrigins?: string[];
  @observable shippingOriginsStatus: Status = Status.INITIAL;

  @observable areFiltersOpen = false;

  @observable geoShippingExperiment?: Experiment;
  @observable goBiasExperiment?: Experiment;
  @observable greatFeaturesBadgeExperiment?: Experiment;

  constructor(initialState?: InitialCarsStoreState) {
    this.invSearchNetworker = new InvSearchNetworker(
      publicRuntimeConfig.INVSEARCH_V3_URL || ''
    );

    if (initialState) {
      this.attributionQueryString = initialState.attributionQueryString;
      this.makeBuckets = initialState.makes;
      this.inventoryData = initialState.cars;
      this.popularCarsData = initialState.popularCars;
      this.filtersData = initialState.filtersData;
      this.isTitleQAPass = initialState.titleQuery;
      this.zipCode = initialState.zipCode;
    }
  }

  @action
  setGreatFeaturesBadgeExperiment(experiment: Experiment): void {
    this.greatFeaturesBadgeExperiment = experiment;
  }

  @action
  setGeoShippingExperiment = (geoShippingExperiment?: Experiment): void => {
    if (this.zipCode && geoShippingExperiment) {
      geoShippingExperiment.assignedVariant = 1;
      this.geoShippingExperiment = geoShippingExperiment;
    }
    this.geoShippingExperiment = geoShippingExperiment;
  };

  @action
  setGoBiasExperiment = (goBiasExperiment?: Experiment): void => {
    this.goBiasExperiment = goBiasExperiment;
  };

  @action
  setAreFiltersOpen = (areFiltersOpen: boolean): void => {
    this.areFiltersOpen = areFiltersOpen;
  };

  @action
  toggleAreFiltersOpen = (): void => {
    this.areFiltersOpen = !this.areFiltersOpen;
  };

  @action
  setInventoryStatus = (inventoryStatus: Status): void => {
    this.inventoryStatus = inventoryStatus;
  };

  @action
  fetchInventoryData = async (shippingOrigins?: string[]): Promise<void> => {
    try {
      this.inventoryStatus = Status.FETCHING;
      const postInventoryRequestDataFromFiltersData = getPostInventoryRequestDataFromFilterData(
        this.filtersData,
        this.geoShippingExperiment,
        shippingOrigins
      );

      const showIsAvailableSoon = postInventoryRequestDataFromFiltersData.testdriveonly
        ? false
        : undefined;

      const inventoryRequestData: PostInventoryRequestData = {
        ...postInventoryRequestDataFromFiltersData,
        fulldetails: false,
        limit: INVENTORY_CARDS_PER_PAGE,
        source: `${publicRuntimeConfig.NAME}-${publicRuntimeConfig.VERSION}`,
        isTitleQAPass: this.isTitleQAPass,
        // DELTA-265.
        // It's needed on the TDA whitelabel b/c the 'isAvailableSoon' field
        // must be false when querying Test Drivable vehicles.
        isAvailableSoon: showIsAvailableSoon,
      };

      const inventoryResponse = await this.invSearchNetworker.postInventory(
        inventoryRequestData
      );
      runInAction(() => {
        this.inventoryData = inventoryResponse.data;
        this.inventoryStatus = Status.SUCCESS;
      });
    } catch {
      runInAction(() => {
        this.inventoryData = undefined;
        this.inventoryStatus = Status.ERROR;
      });
    }
  };

  @action
  private fetchPopularCarsData = async (): Promise<void> => {
    try {
      this.popularCarsStatus = Status.FETCHING;
      const popularCarsRequestData = {
        fulldetails: false,
        limit: POPULAR_CAR_LIMIT,
        sortdirection: 'asc',
        'sold-status': SoldStatus.FOR_SALE,
        source: `${publicRuntimeConfig.NAME}-${publicRuntimeConfig.VERSION}`,
        isTitleQAPass: this.isTitleQAPass,
      };
      const inventoryResponse = await this.invSearchNetworker.postInventory(
        popularCarsRequestData
      );
      const popularCarsData = inventoryResponse.data;
      runInAction(() => {
        this.popularCarsData = popularCarsData;
        this.popularCarsStatus = Status.SUCCESS;
      });
    } catch {
      runInAction(() => {
        this.popularCarsData = undefined;
        this.popularCarsStatus = Status.ERROR;
      });
    }
  };

  @action
  updateFiltersData = async (
    filtersData?: FiltersData,
    isPagination?: boolean
  ): Promise<void> => {
    // Unless we are explicity paginating, reset the page to the start.
    const filtersDataToUse: FiltersData | undefined = isPagination
      ? filtersData
      : {
          ...filtersData,
          [Filters.PAGE]: undefined,
        };
    const as = getUrlFromFiltersData(filtersDataToUse, {
      addFiltersQueryParam: true,
      ignoreParamsBasePath: true,
      titleQuery: this.isTitleQAPass,
    });

    // FIT-583
    // Persist key attribution query params across navigation.
    // This is a stopgap so that vlassic attributuion works.
    // We should come back and remove this when a better attribution system is in place.
    let asWithAttributionQueryString = as;
    if (this.attributionQueryString !== '') {
      asWithAttributionQueryString =
        as.indexOf('?') === -1
          ? `${as}?${this.attributionQueryString}`
          : `${as}&${this.attributionQueryString}`;
    }

    Router.replace('/[[...params]]', asWithAttributionQueryString, {
      shallow: true,
    });

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    this.filtersData = filtersDataToUse;
    await this.fetchInventoryData();
    if (!this.hasInventory) {
      await this.fetchPopularCarsData();
    }
  };
}

export const CarsStoreContext = createContext<CarsStore>(new CarsStore());
