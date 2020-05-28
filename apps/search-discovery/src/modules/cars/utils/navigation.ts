import { Base64 } from 'js-base64';
import Router from 'next/router';
import { stringify } from 'qs';

import { getFiltersDataFromUrl, sanitize } from 'src/modules/cars/utils/filter';
import {
  ALL_KEY,
  Filters,
  FiltersData,
  MaxAndMin,
  Pathname,
  SortValue,
  Transmission,
} from 'src/modules/cars/utils/types';

const encodeFilters = (filters: FiltersData): string => {
  return Base64.encode(stringify(filters, { encode: false }));
};

export const updateUrl = (
  filters: FiltersData | undefined,
  changedPage?: boolean
): void => {
  let asParams = '';

  const { replace, push } = Router;
  const updatedFilters = changedPage
    ? filters
    : { ...filters, page: undefined };
  const stringQuery = updatedFilters ? encodeFilters(updatedFilters) : '';
  const asQuery = stringQuery ? `?filters=${stringQuery}` : '';
  const query = stringQuery ? { filters: stringQuery } : {};

  if (filters) {
    const yearFromFilters = filters[Filters.YEAR];
    const display =
      yearFromFilters && yearFromFilters.min === yearFromFilters.max
        ? `/${yearFromFilters.min}`
        : yearFromFilters && `/${yearFromFilters.min}-${yearFromFilters.max}`;

    const year = yearFromFilters ? display : '';

    const bodyTypesFromFilters = filters[Filters.BODY_TYPES];
    const bodyType = bodyTypesFromFilters ? bodyTypesFromFilters[0] : undefined;
    const makeAndModelsFromFilters = filters[Filters.MAKE_AND_MODELS];
    const makeKeys = makeAndModelsFromFilters
      ? Object.keys(makeAndModelsFromFilters)
      : undefined;
    const make = makeKeys ? makeKeys[0] : undefined;
    const models = make
      ? makeAndModelsFromFilters && makeAndModelsFromFilters[make]
      : undefined;
    const model = models && models[0] !== 'all' ? models[0] : undefined;
    const descriptorsCombined = [make, model, bodyType]
      .filter(value => value)
      .join('-');
    const descriptor = descriptorsCombined ? `/${descriptorsCombined}` : '';

    asParams = `${descriptor}${year}`;
  }

  const pathname = asParams ? Pathname.WITH_PARAMS : Pathname.WITHOUT_PARAMS;

  const as = `/cars${asParams}${asQuery}`;

  const isCatalog =
    Router.pathname === Pathname.WITH_PARAMS ||
    Router.pathname === Pathname.WITHOUT_PARAMS;

  if (isCatalog) {
    replace({ pathname: pathname, query: query }, as);
  } else {
    push({ pathname: pathname, query: query }, as);
  }
};

export const resetEngineAndDrivetrain = (updatedFilters: FiltersData): void => {
  updateUrl(updatedFilters);
};

export const resetFilter = (key: Filters, filtersData: FiltersData): void => {
  const updatedFilters = {
    ...filtersData,
    [key]: undefined,
  };

  updateUrl(updatedFilters);
};

export const removeFromList = (
  key: Filters,
  value: string,
  filtersData: FiltersData
): void => {
  const list = (filtersData[key] as string[]).slice();
  list.splice(list.indexOf(value), 1);

  const updatedFilters = { ...filtersData, [key]: list };
  updateUrl(updatedFilters);
};

export const addToList = (
  key: Filters,
  value: string,
  filtersData: FiltersData | undefined
): void => {
  const urlData = filtersData ? filtersData : undefined;
  const list =
    urlData && urlData[key] ? (urlData[key] as string[]).slice() : [];
  list.push(value);

  const updatedFilters = { ...filtersData, [key]: list };
  updateUrl(updatedFilters);
};

export const updateMinAndMax = (
  key: Filters,
  values: MaxAndMin,
  filtersData: FiltersData
): void => {
  const updatedFilters = {
    ...filtersData,
    [key]: values,
  };
  updateUrl(updatedFilters);
};

export const updateSort = (
  value: SortValue,
  filtersData: FiltersData
): void => {
  const updatedFilters = {
    ...filtersData,
    [Filters.SORT]: value === SortValue.RECOMMENDED ? undefined : value,
  };

  updateUrl(updatedFilters);
};

export const updateTransmission = (
  value: Transmission,
  filtersData: FiltersData
): void => {
  const id = value === Transmission.AUTO ? 0 : 1;
  const updatedFilters = {
    ...filtersData,
    [Filters.TRANSMISSION]: value === Transmission.ALL ? undefined : id,
  };

  updateUrl(updatedFilters);
};

export const addMake = (
  make: string,
  model: string,
  total: number,
  filtersData?: FiltersData
): void => {
  const getUpdatedFilters = (): FiltersData => {
    const key = Filters.MAKE_AND_MODELS;
    const modelToAdd = sanitize(model);
    const makeToAdd = sanitize(make);

    if (filtersData) {
      const urlFilters = JSON.parse(JSON.stringify(filtersData));
      const makeAndModels = urlFilters[key];

      if (makeAndModels) {
        const make = makeAndModels[makeToAdd];
        if (make) {
          const addForAllAndNewAdd = 2;
          if (
            modelToAdd === ALL_KEY ||
            make.length + addForAllAndNewAdd === total
          ) {
            make.splice(0, make.length);
            make.push(ALL_KEY);
          } else {
            make.indexOf(ALL_KEY) === 0 &&
              make.splice(make.indexOf(ALL_KEY), 1);
            make.push(modelToAdd);
          }
          return { ...urlFilters, [key]: makeAndModels };
        } else {
          makeAndModels[makeToAdd] = [modelToAdd];
          return {
            ...urlFilters,
            [key]: makeAndModels,
          };
        }
      } else {
        return {
          ...urlFilters,
          [key]: { [makeToAdd]: [modelToAdd] },
        };
      }
    } else {
      return { [key]: { [makeToAdd]: [modelToAdd] } };
    }
  };

  const updatedFilters = getUpdatedFilters();
  updateUrl(updatedFilters);
};

export const removeMakeOrModel = (make: string, model: string): void => {
  const {
    query: { filters },
  } = Router;

  const urlFilters = getFiltersDataFromUrl(
    typeof filters === 'string' ? (filters as string) : undefined
  );
  const key = Filters.MAKE_AND_MODELS;
  const modelToRemove = sanitize(model);
  const makeToLookAt = sanitize(make);

  const makesAndModels = urlFilters && urlFilters[key];
  if (makesAndModels) {
    const make = makesAndModels[makeToLookAt];
    if (make) {
      make.splice(make.indexOf(modelToRemove), 1);
      if (make.length === 0) {
        delete makesAndModels[makeToLookAt];
      }
    }
  }
  updateUrl(urlFilters);
};

export const onPageChange = (page: number, filtersData?: FiltersData): void => {
  const actualPage = page == 1 ? undefined : page;

  const updatedFilters = {
    ...filtersData,
    [Filters.PAGE]: actualPage,
  };

  updateUrl(updatedFilters, true);

  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};
