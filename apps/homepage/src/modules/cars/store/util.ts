import Router from 'next/router';

import { Car, Hit, Inventory } from '../../../networking/models/Inventory.v3';
import {
  Filters,
  FiltersData,
  getFiltersDataFromUrl,
  MakeAndModels,
  MaxAndMin,
} from '../util';

import { track } from 'src/integrations/analytics';

export enum Filter {
  MAKE_AND_MODEL = 'Make & Model',
  BODY_TYPE = 'Body Type',
  COLOR = 'Color',
  YEAR = 'Year',
  PRICE = 'Price',
  MILES = 'Miles',
  ENGINE_AND_DRIVETRAIN = 'Engine & Drivetrain',
}

// enum FilterExtra {
//   TRANSMISSION = 'Transmission',
//   DRIVE_TYPE = 'Drive Type',
//   SORT = 'Sort',
//   SEARCH = 'Search',
//   PAGE = 'Page',
// }

// const FilterURLKeys = { ...Filter, ...FilterExtra };

export type FilterUrlData =
  | string
  | number
  | MakeAndModels
  | string[]
  | MaxAndMin
  | undefined;

export interface FilterState {
  display: string;
  open: boolean;
  urlData: FilterUrlData;
}

export interface FiltersState {
  [filter: string]: FilterState;
}

interface Product {
  vin: string;
  name: string;
  make: string;
  model: string;
  year: number;
  price: number;
  position: number;
  sale_status: number;
  url: string;
  image_url: string;
}

const getCars = (inventory: Inventory): Car[] => {
  return inventory.data.hits.hits.map((hit: Hit) => {
    const { _source } = hit;
    return _source;
  });
};

const getFilterTypesAndValues = (filters: FiltersData) => {
  return Object.keys(filters).map(filter => {
    switch (filter) {
      case Filters.MAKE_AND_MODELS:
        return {
          type: 'Make & Models',
          values: filters[Filters.MAKE_AND_MODELS],
        };

      case Filters.BODY_TYPES:
        return {
          type: 'Body Type',
          values: filters[Filters.BODY_TYPES],
        };

      case Filters.COLORS:
        return {
          type: 'Color',
          values: filters[Filters.COLORS],
        };

      case Filters.YEAR:
        return {
          type: 'Year',
          values: filters[Filters.YEAR],
        };

      case Filters.PRICE:
        return {
          type: 'Year',
          values: filters[Filters.PRICE],
        };

      case Filters.MILES:
        return {
          type: 'Miles',
          values: filters[Filters.MILES],
        };

      case Filters.TRANSMISSION:
        return {
          type: 'Transmission',
          values: filters[Filters.TRANSMISSION],
        };

      case Filters.DRIVE_TYPE:
        return {
          type: 'Drive Type',
          values: filters[Filters.DRIVE_TYPE],
        };

      default:
        return undefined;
    }
  });
};

export const trackProductList = (inventory: Inventory): void => {
  const category = 'Catalog';
  const products = getCars(inventory).map(
    (car, index): Product => {
      const {
        leadFlagPhotoUrl,
        year,
        make,
        model,
        listingPrice,
        vin,
        soldStatus,
      } = car;
      const name = `${year} ${make} ${model}`;

      const url = `/inventory/${vin}`;
      return {
        vin: vin,
        name: name,
        make: make,
        model: model,
        year: year,
        price: listingPrice,
        position: index,
        ['sale_status']: soldStatus,
        url: url,
        ['image_url']: leadFlagPhotoUrl,
      };
    }
  );

  const properties = {
    category: category,
    products: products,
  };

  const { router } = Router;

  if (router) {
    const {
      query: { filters },
    } = router;

    if (filters) {
      const urlFilters = getFiltersDataFromUrl(filters);
      if (urlFilters) {
        const transformedFilters = getFilterTypesAndValues(urlFilters);
        const sort = urlFilters[Filters.SORT];
        track('Product List Filtered', {
          ...properties,
          filters: transformedFilters,
          sort,
        });
      }
    }
  }

  track('Product List Viewed', properties);
};

export const getFiltersStateFromUrl = (
  filtersDataFromUrl: FiltersData | undefined
): FiltersState => {
  const isActive = (key: Filters): boolean => {
    return filtersDataFromUrl ? !!filtersDataFromUrl[key] : false;
  };

  const getUrlData = (key: Filters): FilterUrlData => {
    return filtersDataFromUrl ? filtersDataFromUrl[key] : undefined;
  };

  return {
    [Filter.MAKE_AND_MODEL]: {
      display: Filter.MAKE_AND_MODEL,
      open: true,
      urlData: getUrlData(Filters.MAKE_AND_MODELS),
    },
    [Filter.BODY_TYPE]: {
      display: Filter.BODY_TYPE,
      open: isActive(Filters.BODY_TYPES),
      urlData: getUrlData(Filters.BODY_TYPES),
    },
    [Filter.COLOR]: {
      display: Filter.COLOR,
      open: isActive(Filters.COLORS),
      urlData: getUrlData(Filters.COLORS),
    },
    [Filter.YEAR]: {
      display: Filter.YEAR,
      open: isActive(Filters.YEAR),
      urlData: getUrlData(Filters.YEAR),
    },
    [Filter.PRICE]: {
      display: Filter.PRICE,
      open: isActive(Filters.PRICE),
      urlData: getUrlData(Filters.PRICE),
    },
    [Filter.MILES]: {
      display: Filter.MILES,
      open: isActive(Filters.MILES),
      urlData: getUrlData(Filters.MILES),
    },
    [Filter.ENGINE_AND_DRIVETRAIN]: {
      display: Filter.ENGINE_AND_DRIVETRAIN,
      open: isActive(Filters.TRANSMISSION) || isActive(Filters.DRIVE_TYPE),
      urlData: getUrlData(Filters.TRANSMISSION),
    },
  };
};
