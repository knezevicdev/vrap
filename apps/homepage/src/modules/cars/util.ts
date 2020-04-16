/*
  TODO
  Come back and clean this util and the views util
 */

import { Base64 } from 'js-base64';
import { parse } from 'qs';
import React from 'react';

import {
  Inventory,
  MakeBuckets,
  SearchParams,
  SoldStatus,
} from '../../networking/models/Inventory.v3';
import { Networker } from '../../networking/Networker';
import {
  BodyType,
  bodyTypes,
} from './components/Filters/components/BodyTypes/types';
import { ALL_KEY, sanitize } from './components/util';
import { Store } from './store';

const INVENTORY_LIMIT = 24;
const POPULAR_CAR_LIMIT = 12;

export interface MaxAndMin {
  min: number;
  max: number;
}

export interface MakeAndModels {
  [make: string]: string[];
}

/*
  TODO
  Look into moving types and enums
 */

export enum Transmission {
  ALL = 'All',
  AUTO = 'Automatic Only',
  MANUAL = 'Manual Only',
}

export enum DriveType {
  FOUR_BY_FOUR = '4x4',
  AWD = 'AWD',
  FWD = 'FWD',
  RWD = 'RWD',
}

export enum SortValue {
  DEFAULT = 'Recommended',
  NEWEST_MODEL = 'Newest Model',
  LOWEST_PRICE = 'Lowest Price',
  HIGHEST_PRICE = 'Highest Price',
  LOWEST_MILES = 'Lowest Miles',
}

export enum Filters {
  PAGE = 'page',
  MAKE_AND_MODELS = 'makemodels',
  BODY_TYPES = 'bodytypes',
  COLORS = 'colors',
  YEAR = 'year',
  PRICE = 'price',
  MILES = 'miles',
  TRANSMISSION = 'transmission',
  DRIVE_TYPE = 'drivetype',
  SORT = 'sort',
  SEARCH = 'search',
}

export interface FiltersData {
  [Filters.MAKE_AND_MODELS]?: MakeAndModels;
  [Filters.BODY_TYPES]?: string[];
  [Filters.COLORS]?: string[];
  [Filters.YEAR]?: MaxAndMin;
  [Filters.PRICE]?: MaxAndMin;
  [Filters.MILES]?: MaxAndMin;
  [Filters.TRANSMISSION]?: number;
  [Filters.DRIVE_TYPE]?: string[];
  [Filters.PAGE]?: number;
  [Filters.SORT]?: SortValue;
  [Filters.SEARCH]?: string;
}

export enum Pathname {
  WITH_PARAMS = '/cars/[...params]',
  WITHOUT_PARAMS = '/cars',
}

export interface Props {
  makeAndModelsData: MakeAndModels | undefined;
  inventoryData: Inventory | undefined;
  popularCarsData: Inventory | undefined;
  serverQueryFilters: string[] | string;
}

export const CarsContext = React.createContext<{ store: Store }>({
  store: new Store(true),
});

export const getFiltersDataFromUrl = (
  routerQueryFilters: string[] | string
): FiltersData | undefined => {
  if (routerQueryFilters) {
    const decoded = Base64.decode(routerQueryFilters as string);
    let parsed = parse(decoded);
    parsed.miles &&
      (parsed = {
        ...parsed,
        miles: {
          min: parseInt(parsed.miles.min),
          max: parseInt(parsed.miles.max),
        },
      });

    parsed.year &&
      (parsed = {
        ...parsed,
        year: {
          min: parseInt(parsed.year.min),
          max: parseInt(parsed.year.max),
        },
      });

    parsed.price &&
      (parsed = {
        ...parsed,
        price: {
          min: parseInt(parsed.price.min),
          max: parseInt(parsed.price.max),
        },
      });

    parsed.transmission &&
      (parsed = {
        ...parsed,
        transmission: parseInt(parsed.transmission),
      });

    parsed.page &&
      (parsed = {
        ...parsed,
        page: parseInt(parsed.page),
      });

    return parsed;
  }

  return undefined;
};

const transformResponse = (data: Inventory): MakeAndModels => {
  const makes = data.data.aggregations.make_count.buckets.sort((a, b) => {
    return a.key > b.key ? 1 : -1;
  });

  return makes.reduce((current: MakeAndModels, make: MakeBuckets) => {
    const models = make.model_count.buckets.map(model => model.key);
    const name = make.key;

    current[name] = ['All'].concat(models);
    return current;
  }, {});
};

const getDataForMakeAndModels = async (): Promise<
  MakeAndModels | undefined
> => {
  try {
    const dataForMakeAndModel = {
      fulldetails: false,
      limit: 1,
      sortdirection: 'asc',
      'sold-status': SoldStatus.FOR_SALE,
    };

    const makeAndModelResponse = await new Networker().postInventory(
      dataForMakeAndModel
    );

    return transformResponse(makeAndModelResponse.data);
  } catch {
    return undefined;
  }
};

const getFilterData = (
  filters: string[] | string,
  makeAndModelMap?: MakeAndModels
): SearchParams | undefined => {
  const urlFilters = getFiltersDataFromUrl(filters);

  if (urlFilters) {
    const {
      year,
      miles,
      drivetype,
      transmission,
      price,
      colors,
      bodytypes,
      makemodels,
      page,
      sort,
      search,
    } = urlFilters;

    const { make, model } =
      makemodels && makeAndModelMap
        ? Object.keys(makemodels).reduce(
            (current, make) => {
              const models = makemodels[make];
              const isAll = models[0] === ALL_KEY;
              const makesMap = Object.keys(makeAndModelMap);
              const makeIndex = makesMap.findIndex(m => sanitize(m) === make);
              if (isAll) {
                current.make.push(makesMap[makeIndex]);
              } else {
                const mappedModels = models.map(model => {
                  const key = makesMap[makeIndex];
                  const modelsMap = makeAndModelMap[key];
                  const modelIndex = modelsMap.findIndex(
                    m => sanitize(m) === model
                  );
                  return modelsMap[modelIndex];
                });

                current.model = current.model.concat(mappedModels);
              }
              return current;
            },
            { make: [] as string[], model: [] as string[] }
          )
        : { make: undefined, model: undefined };

    const bodytype = bodytypes
      ? bodytypes.map(bodytype => {
          const item = bodyTypes.find(
            body => body.url === bodytype
          ) as BodyType;
          return item.api;
        })
      : undefined;

    const transmissionId =
      transmission === 0 || transmission === 1
        ? transmission.toString()
        : undefined;

    const offset = page ? (page - 1) * INVENTORY_LIMIT : undefined;

    const getSortBy = (): string | undefined => {
      switch (sort) {
        case SortValue.NEWEST_MODEL:
          return 'year';
        case SortValue.LOWEST_PRICE:
        case SortValue.HIGHEST_PRICE:
          return 'listingPrice';
        case SortValue.LOWEST_MILES:
          return 'miles';
        default:
          return undefined;
      }
    };

    const sortby = getSortBy();
    const sortdirection =
      sort === SortValue.NEWEST_MODEL || sort === SortValue.HIGHEST_PRICE
        ? 'desc'
        : 'asc';

    return {
      make: make,
      model: model,
      bodytype: bodytype,
      color: colors,
      year: year,
      price: price,
      miles: miles,
      transmissionid: transmissionId,
      drivetype: drivetype,
      offset: offset,
      sortby: sortby,
      sortdirection: sortdirection,
      searchall: search,
    };
  }
};

const getInventoryData = (
  filters: string[] | string,
  makeAndModelMap: MakeAndModels | undefined
): SearchParams => {
  const filterData = getFilterData(filters, makeAndModelMap);

  return {
    ...filterData,
    fulldetails: false,
    limit: INVENTORY_LIMIT,
    sortdirection: filterData?.sortdirection ? filterData.sortdirection : 'asc',
    'sold-status': SoldStatus.FOR_SALE,
  };
};

const fetchInventoryData = async (
  filters: string[] | string,
  makeAndModelMap: MakeAndModels | undefined
): Promise<Inventory | undefined> => {
  const data = getInventoryData(filters, makeAndModelMap);

  try {
    const inventoryResponse = await new Networker().postInventory(data);
    return inventoryResponse.data;
  } catch {
    return undefined;
  }
};

const fetchPopularCars = async (): Promise<Inventory | undefined> => {
  const data = {
    fulldetails: false,
    limit: POPULAR_CAR_LIMIT,
    sortdirection: 'asc',
    'sold-status': SoldStatus.FOR_SALE,
  };

  try {
    const inventoryResponse = await new Networker().postInventory(data);
    return inventoryResponse.data;
  } catch {
    return undefined;
  }
};

export {
  getDataForMakeAndModels,
  getInventoryData,
  fetchInventoryData,
  fetchPopularCars,
  getFilterData,
  INVENTORY_LIMIT,
  POPULAR_CAR_LIMIT,
};
