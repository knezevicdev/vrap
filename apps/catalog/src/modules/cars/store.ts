import {
  Filters,
  FiltersData,
  getFiltersDataFromUrl,
  getUrlFromFiltersData,
} from '@vroom-web/catalog-url-integration';
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
  filtersData?: FiltersData;
  makeBuckets?: MakeBucket[];
  makeBucketsStatus: Status;
  inventoryData?: Inventory;
  inventoryStatus: Status;
  popularCarsData?: Inventory;
  popularCarsStatus: Status;
  geoLocationSortDefaultVariant: boolean;
}

export const getBodyTypeRequestData = (
  filtersData: FiltersData
): BodyTypeAPI[] | undefined => {
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
  filtersData: FiltersData
): ColorAPI[] | undefined => {
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
  filtersData: FiltersData
): DriveTypeAPI[] | undefined => {
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

export const getMakeAndModelRequestData = (
  filtersData: FiltersData
): {
  makeSlug?: string[];
  modelSlug?: string[];
} => {
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
  filtersData: FiltersData
): number | undefined => {
  const filtersDataPage = filtersData[Filters.PAGE];
  if (!filtersDataPage) {
    return undefined;
  }
  return (filtersDataPage - 1) * INVENTORY_CARDS_PER_PAGE;
};

export const getSortRequestData = (
  filtersData: FiltersData,
  geoLocationSortDefaultVariant?: boolean
): {
  sortby?: SortAPIBy;
  sortdirection?: SortAPIDirection;
} => {
  const filtersDataSort = filtersData[Filters.SORT];
  if (!filtersDataSort) {
    return {
      sortby: geoLocationSortDefaultVariant ? undefined : SortAPIBy.GEO,
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
  filtersData: FiltersData
): TransmissionAPI | undefined => {
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
  geoLocationSortDefaultVariant?: boolean,
  geo?: Coordinates
): PostInventoryRequestData => {
  if (!filtersData) {
    if (geoLocationSortDefaultVariant || !geo) {
      return {};
    }
    return {
      sortby: 'geo',
      geo: {
        lat: `${geo.latitude}`,
        long: `${geo.longitude}`,
      },
    };
  }

  const bodytype = getBodyTypeRequestData(filtersData);
  const color = getColorRequestData(filtersData);
  const drivetype = getDriveTypeRequestData(filtersData);
  const { makeSlug, modelSlug } = getMakeAndModelRequestData(filtersData);
  const offset = getOffsetRequestData(filtersData);
  const { sortby, sortdirection } = getSortRequestData(
    filtersData,
    geoLocationSortDefaultVariant
  );
  const transmissionid = getTransmissionRequestData(filtersData);

  return {
    bodytype,
    color,
    drivetype,
    makeSlug,
    miles: filtersData[Filters.MILES],
    modelSlug,
    offset,
    price: filtersData[Filters.PRICE],
    searchall: filtersData[Filters.SEARCH],
    sortby,
    sortdirection,
    transmissionid,
    year: filtersData[Filters.YEAR],
  };
};

export async function getInitialCarsStoreState(
  attributionQueryString: string,
  geoLocationSortDefaultVariant: boolean,
  geo: Coordinates | undefined,
  filtersQueryParam?: string
): Promise<InitialCarsStoreState> {
  const initialState: InitialCarsStoreState = {
    attributionQueryString,
    makeBucketsStatus: Status.INITIAL,
    inventoryStatus: Status.INITIAL,
    popularCarsStatus: Status.INITIAL,
    geoLocationSortDefaultVariant,
  };

  initialState.filtersData = getFiltersDataFromUrl(filtersQueryParam);

  if (!publicRuntimeConfig.INVSEARCH_V3_URL) {
    throw new Error('publicRuntimeConfig.INVSEARCH_V3_URL is undefined');
  }

  const invSearchNetworker = new InvSearchNetworker(
    publicRuntimeConfig.INVSEARCH_V3_URL
  );

  try {
    initialState.makeBucketsStatus = Status.FETCHING;
    const makesRequestData: PostInventoryRequestData = {
      fulldetails: false,
      limit: 1,
      sortdirection: 'asc',
      source: `${publicRuntimeConfig.NAME}-${publicRuntimeConfig.VERSION}`,
    };
    const makesResponse = await invSearchNetworker.postInventory(
      makesRequestData
    );
    const makeBuckets = makesResponse.data.aggregations.make_count.buckets;
    initialState.makeBuckets = makeBuckets;
    initialState.makeBucketsStatus = Status.SUCCESS;
  } catch {
    initialState.makeBucketsStatus = Status.ERROR;
  }

  try {
    initialState.inventoryStatus = Status.FETCHING;
    const postInventoryRequestDataFromFiltersData = getPostInventoryRequestDataFromFilterData(
      initialState.filtersData,
      geoLocationSortDefaultVariant,
      geo
    );
    const inventoryRequestData: PostInventoryRequestData = {
      ...postInventoryRequestDataFromFiltersData,
      fulldetails: true,
      limit: INVENTORY_CARDS_PER_PAGE,
      source: `${publicRuntimeConfig.NAME}-${publicRuntimeConfig.VERSION}`,
    };
    console.log(inventoryRequestData);
    const inventoryResponse = await invSearchNetworker.postInventory(
      inventoryRequestData
    );
    initialState.inventoryData = inventoryResponse.data;
    initialState.inventoryStatus = Status.SUCCESS;
  } catch {
    initialState.inventoryStatus = Status.ERROR;
  }

  const hasNoInventory = initialState.inventoryData?.hits.total === 0;
  if (hasNoInventory) {
    try {
      initialState.popularCarsStatus = Status.FETCHING;
      const popularCarsRequestData = {
        fulldetails: true,
        limit: POPULAR_CAR_LIMIT,
        sortdirection: 'asc',
        'sold-status': SoldStatus.FOR_SALE,
        source: `${publicRuntimeConfig.NAME}-${publicRuntimeConfig.VERSION}`,
      };
      const inventoryResponse = await invSearchNetworker.postInventory(
        popularCarsRequestData
      );
      const popularCarsData = inventoryResponse.data;
      initialState.popularCarsData = popularCarsData;
      initialState.popularCarsStatus = Status.SUCCESS;
    } catch {
      initialState.popularCarsStatus = Status.ERROR;
    }
  }

  return initialState;
}

export class CarsStore {
  private readonly invSearchNetworker: InvSearchNetworker;

  readonly attributionQueryString: string = '';
  readonly geoLocationSortDefaultVariant: boolean = true;
  readonly inventoryCardsPerPage: number = INVENTORY_CARDS_PER_PAGE;
  readonly bodyTypes: BodyType[] = bodyTypes;
  readonly colors: Color[] = colors;
  readonly driveTypes: DriveType[] = driveTypes;
  readonly sorts: Sort[] = sorts;
  readonly transmissions: Transmission[] = transmissions;

  @observable filtersData?: FiltersData;

  @observable makeBuckets?: MakeBucket[];
  @observable makeBucketsStatus: Status = Status.INITIAL;

  @observable inventoryData?: Inventory;
  @observable inventoryStatus: Status = Status.INITIAL;
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

  constructor(initialState?: InitialCarsStoreState) {
    this.invSearchNetworker = new InvSearchNetworker(
      publicRuntimeConfig.INVSEARCH_V3_URL || ''
    );

    if (initialState) {
      this.attributionQueryString = initialState.attributionQueryString;
      this.filtersData = initialState.filtersData;
      this.makeBuckets = initialState.makeBuckets;
      this.makeBucketsStatus = initialState.makeBucketsStatus;
      this.inventoryData = initialState.inventoryData;
      this.inventoryStatus = initialState.inventoryStatus;
      this.popularCarsData = initialState.popularCarsData;
      this.popularCarsStatus = initialState.popularCarsStatus;
      this.geoLocationSortDefaultVariant =
        initialState.geoLocationSortDefaultVariant;
    }
  }

  @action
  setAreFiltersOpen = (areFiltersOpen: boolean): void => {
    this.areFiltersOpen = areFiltersOpen;
  };

  @action
  toggleAreFiltersOpen = (): void => {
    this.areFiltersOpen = !this.areFiltersOpen;
  };

  @action
  private fetchInventoryData = async (): Promise<void> => {
    try {
      this.inventoryStatus = Status.FETCHING;
      const postInventoryRequestDataFromFiltersData = getPostInventoryRequestDataFromFilterData(
        this.filtersData,
        this.geoLocationSortDefaultVariant
      );
      const inventoryRequestData: PostInventoryRequestData = {
        ...postInventoryRequestDataFromFiltersData,
        fulldetails: true,
        limit: INVENTORY_CARDS_PER_PAGE,
        source: `${publicRuntimeConfig.NAME}-${publicRuntimeConfig.VERSION}`,
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
        fulldetails: true,
        limit: POPULAR_CAR_LIMIT,
        sortdirection: 'asc',
        'sold-status': SoldStatus.FOR_SALE,
        source: `${publicRuntimeConfig.NAME}-${publicRuntimeConfig.VERSION}`,
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
    const as = getUrlFromFiltersData(filtersDataToUse);

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

    Router.replace('/cars/[[...params]]', asWithAttributionQueryString, {
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
