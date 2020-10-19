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
  Color,
  ColorAPI,
  colors,
  Cylinder,
  CylinderApi,
  cylinders,
  DriveType,
  DriveTypeAPI,
  driveTypes,
  INVENTORY_CARDS_PER_PAGE,
  POPULAR_CAR_LIMIT,
  Sort,
  SortAPIBy,
  SortAPIDirection,
  sorts,
  Transmission,
  TransmissionAPI,
  transmissions,
} from './data';

import { Status } from 'src/networking/types';

const { publicRuntimeConfig } = getConfig();

export interface InitialCarsStoreState {
  attributionQueryString: string;
  makes: MakeBucket[] | undefined;
  cars: Inventory | undefined;
  popularCars: Inventory | undefined;
  filtersData: FiltersData | undefined;
  titleQuery?: boolean;
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

export const getSortRequestData = (
  filtersData?: FiltersData,
  geoLocationSortExperiment?: Experiment
): {
  sortby?: SortAPIBy;
  sortdirection?: SortAPIDirection;
} => {
  if (!filtersData) {
    const sortby =
      geoLocationSortExperiment &&
      geoLocationSortExperiment.assignedVariant === 1
        ? SortAPIBy.GEO
        : undefined;
    return {
      sortby,
      sortdirection: undefined,
    };
  }
  const filtersDataSort = filtersData[Filters.SORT];
  if (!filtersDataSort) {
    const sortby =
      geoLocationSortExperiment &&
      geoLocationSortExperiment.assignedVariant === 1
        ? SortAPIBy.GEO
        : undefined;
    return {
      sortby,
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

export const getTransmissionRequestData = (
  filtersData?: FiltersData
): TransmissionAPI | undefined => {
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
  return matchingTransmission.api;
};

export const getPostInventoryRequestDataFromFilterData = (
  filtersData?: FiltersData,
  geoLocationSortExperiment?: Experiment
): PostInventoryRequestData => {
  const bodytype = getBodyTypeRequestData(filtersData);
  const color = getColorRequestData(filtersData);
  const drivetype = getDriveTypeRequestData(filtersData);
  const cylinders = getCylinderRequestData(filtersData);
  const { makeSlug, modelSlug } = getMakeAndModelRequestData(filtersData);
  const offset = getOffsetRequestData(filtersData);
  const { sortby, sortdirection } = getSortRequestData(
    filtersData,
    geoLocationSortExperiment
  );
  const transmissionid = getTransmissionRequestData(filtersData);

  return {
    bodytype,
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
    transmissionid,
    year: filtersData ? filtersData[Filters.YEAR] : undefined,
    cylinders,
    cylindersShowOther:
      (filtersData && filtersData[Filters.OTHER_CYLINDERS]) || undefined,
  };
};

export class CarsStore {
  private readonly invSearchNetworker: InvSearchNetworker;
  private readonly isTitleQAPass?: boolean;

  readonly attributionQueryString: string = '';
  readonly geoLocationSortDefaultVariant: boolean = true;
  readonly inventoryCardsPerPage: number = INVENTORY_CARDS_PER_PAGE;
  readonly bodyTypes: BodyType[] = bodyTypes;
  readonly colors: Color[] = colors;
  readonly driveTypes: DriveType[] = driveTypes;
  readonly cylinders: Cylinder[] = cylinders;
  readonly sorts: Sort[] = sorts;
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

  @observable areFiltersOpen = false;

  @observable geoLocationSortExperiment?: Experiment;

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
    }
  }

  @action
  setGeoLocationSortExperiment = (
    geoLocationSortExperiment?: Experiment
  ): void => {
    this.geoLocationSortExperiment = geoLocationSortExperiment;
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
  fetchInventoryData = async (): Promise<void> => {
    try {
      this.inventoryStatus = Status.FETCHING;
      const postInventoryRequestDataFromFiltersData = getPostInventoryRequestDataFromFilterData(
        this.filtersData,
        this.geoLocationSortExperiment
      );
      const inventoryRequestData: PostInventoryRequestData = {
        ...postInventoryRequestDataFromFiltersData,
        fulldetails: false,
        limit: INVENTORY_CARDS_PER_PAGE,
        source: `${publicRuntimeConfig.NAME}-${publicRuntimeConfig.VERSION}`,
        isTitleQAPass: this.isTitleQAPass,
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
