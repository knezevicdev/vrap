import { Base64 } from 'js-base64';

import {
  isEnum,
  isEnumArray,
  isMakeAndModels,
  isMaxAndMin,
  isNumber,
  isObject,
  isSort,
  isString,
} from './typeguards';
import {
  BodyType,
  Color,
  DriveType,
  Filters,
  FiltersData,
  Transmission,
} from './types';

export const getDescriptorParam = (filtersData: FiltersData): string => {
  const descriptorParamArray: string[] = [];

  const filtersDataMakeAndModels = filtersData[Filters.MAKE_AND_MODELS];
  if (filtersDataMakeAndModels && filtersDataMakeAndModels.length > 0) {
    const makeAndModels = filtersDataMakeAndModels[0];
    descriptorParamArray.push(makeAndModels.makeSlug);
    if (makeAndModels.modelSlugs && makeAndModels.modelSlugs.length > 0) {
      descriptorParamArray.push(makeAndModels.modelSlugs[0]);
    }
  }

  const filtersDataBodyTypes = filtersData[Filters.BODY_TYPES];
  if (filtersDataBodyTypes && filtersDataBodyTypes.length > 0) {
    descriptorParamArray.push(filtersDataBodyTypes[0]);
  }

  if (descriptorParamArray.length === 0) {
    return '';
  }
  return `/${descriptorParamArray.join('/')}`;
};

export const getYearParam = (filtersData: FiltersData): string => {
  const filtersDataYear = filtersData[Filters.YEAR];
  if (!filtersDataYear) {
    return '';
  }
  if (filtersDataYear.min === filtersDataYear.max) {
    return `/${filtersDataYear.min}`;
  }
  return `/${filtersDataYear.min}-${filtersDataYear.max}`;
};

export const getParams = (filtersData?: FiltersData): string => {
  if (!filtersData) {
    return '';
  }
  return `${getDescriptorParam(filtersData)}${getYearParam(filtersData)}`;
};

export const getQuery = (filtersData?: FiltersData): string => {
  if (!filtersData) {
    return '';
  }
  const jsonFiltersData = JSON.stringify(filtersData);
  if (jsonFiltersData === '{}') {
    return '';
  }
  const encodedFiltersData = Base64.encode(jsonFiltersData);
  return `?filters=${encodedFiltersData}`;
};

export const getUrlFromFiltersData = (filtersData?: FiltersData): string => {
  const url = `/cars${getParams(filtersData)}${getQuery(filtersData)}`;
  return url;
};

export const getFiltersDataFromUrl = (
  filtersQueryParam?: string
): FiltersData | undefined => {
  if (!filtersQueryParam) {
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let parsed: any;

  try {
    const decoded = Base64.decode(filtersQueryParam);
    parsed = JSON.parse(decoded);
  } catch {
    return undefined;
  }

  if (!isObject(parsed)) {
    return undefined;
  }

  const filtersData: FiltersData = {};

  const isBodyTypeArray = isEnumArray(BodyType);
  if (isBodyTypeArray(parsed[Filters.BODY_TYPES])) {
    filtersData[Filters.BODY_TYPES] = parsed[Filters.BODY_TYPES];
  }

  const isColorArray = isEnumArray(Color);
  if (isColorArray(parsed[Filters.COLORS])) {
    filtersData[Filters.COLORS] = parsed[Filters.COLORS];
  }

  const isDriveTypeArray = isEnumArray(DriveType);
  if (isDriveTypeArray(parsed[Filters.DRIVE_TYPE])) {
    filtersData[Filters.DRIVE_TYPE] = parsed[Filters.DRIVE_TYPE];
  }

  if (isMakeAndModels(parsed[Filters.MAKE_AND_MODELS])) {
    filtersData[Filters.MAKE_AND_MODELS] = parsed[Filters.MAKE_AND_MODELS];
  }

  if (isMaxAndMin(parsed[Filters.MILES])) {
    filtersData[Filters.MILES] = parsed[Filters.MILES];
  }

  if (isNumber(parsed[Filters.PAGE])) {
    filtersData[Filters.PAGE] = parsed[Filters.PAGE];
  }

  if (isMaxAndMin(parsed[Filters.PRICE])) {
    filtersData[Filters.PRICE] = parsed[Filters.PRICE];
  }

  if (isString(parsed[Filters.SEARCH])) {
    filtersData[Filters.SEARCH] = parsed[Filters.SEARCH];
  }

  if (isSort(parsed[Filters.SORT])) {
    filtersData[Filters.SORT] = parsed[Filters.SORT];
  }

  const isTransmission = isEnum(Transmission);
  if (isTransmission(parsed[Filters.TRANSMISSION])) {
    filtersData[Filters.TRANSMISSION] = parsed[Filters.TRANSMISSION];
  }

  if (isMaxAndMin(parsed[Filters.YEAR])) {
    filtersData[Filters.YEAR] = parsed[Filters.YEAR];
  }

  return filtersData;
};
