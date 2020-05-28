import { Base64 } from 'js-base64';
import { parse } from 'qs';

import {
  ALL_KEY,
  BodyType,
  bodyTypes,
  Filters,
  FiltersData,
  FiltersString,
  INVENTORY_LIMIT,
  MakeAndModels,
  SortValue,
} from 'src/modules/cars/utils/types';
import { SearchParams } from 'src/networking/models/Inventory.v3';

export const sanitize = (str: string): string => {
  const toUnderscoreRegex = /-| /g;
  return str.replace(toUnderscoreRegex, '_').toLowerCase();
};

interface MaxAndMin {
  min: string;

  max: string;
}

interface FiltersParsed extends FiltersString {
  [Filters.YEAR]?: MaxAndMin;
  [Filters.PRICE]?: MaxAndMin;
  [Filters.MILES]?: MaxAndMin;
  [Filters.TRANSMISSION]?: string;
  [Filters.PAGE]?: string;
}

export const getFiltersDataFromUrl = (
  filters?: string
): FiltersData | undefined => {
  if (filters) {
    const decoded = Base64.decode(filters as string);
    const parsed: FiltersParsed = parse(decoded);
    const result: FiltersData = parse(decoded);

    if (parsed.miles)
      result.miles = {
        min: parseInt(parsed.miles.min),
        max: parseInt(parsed.miles.max),
      };

    parsed.year &&
      (result.year = {
        min: parseInt(parsed.year.min),
        max: parseInt(parsed.year.max),
      });

    parsed.price &&
      (result.price = {
        min: parseInt(parsed.price.min),
        max: parseInt(parsed.price.max),
      });

    parsed.transmission &&
      (result.transmission = parseInt(parsed.transmission));

    parsed.page && (result.page = parseInt(parsed.page));

    return result;
  }

  return undefined;
};

export const getFilterData = (
  filters?: string,
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
              const makeIndex = makesMap.findIndex((m) => sanitize(m) === make);
              if (isAll) {
                current.make.push(makesMap[makeIndex]);
              } else {
                const mappedModels = models.map((model) => {
                  const key = makesMap[makeIndex];
                  const modelsMap = makeAndModelMap[key];
                  const modelIndex = modelsMap.findIndex(
                    (m) => sanitize(m) === model
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
      ? bodytypes.map((bodytype) => {
          const item = bodyTypes.find(
            (body) => body.url === bodytype
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
