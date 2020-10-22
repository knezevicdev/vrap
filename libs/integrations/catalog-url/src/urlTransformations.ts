import { Base64 } from 'js-base64';

import {
  isBoolean,
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
  Cylinder,
  DriveType,
  Filters,
  FiltersData,
  GetUrlFromFiltersDataOptions,
  MaxAndMin,
  TestDrive,
  Transmission,
} from './types';

const filtersQueryParamKey = 'filters';
const paramsBasePath = '/cars';
const typesKey = 'types';
const allModelsKey = 'all';

export const getYearParam = (year: MaxAndMin): string => {
  if (year.min === year.max) {
    return `${year.min}`;
  }
  return `${year.min}-${year.max}`;
};

export const getParams = (filtersData?: FiltersData): string => {
  if (!filtersData) {
    return '/';
  }

  const filtersDataMakeAndModels = filtersData[Filters.MAKE_AND_MODELS];
  const makeAndModels = filtersDataMakeAndModels && filtersDataMakeAndModels[0];
  const makeSlug = makeAndModels && makeAndModels.makeSlug;
  const modelSlugs = makeAndModels && makeAndModels.modelSlugs;
  const modelSlug = modelSlugs && modelSlugs[0];

  const year = filtersData[Filters.YEAR];

  const filtersDataBodyTypes = filtersData[Filters.BODY_TYPES];
  const bodyType = filtersDataBodyTypes && filtersDataBodyTypes[0];

  if (makeSlug && year) {
    if (modelSlug) {
      return `/${makeSlug}/${modelSlug}/${getYearParam(year)}`;
    }
    return `/${makeSlug}/${allModelsKey}/${getYearParam(year)}`;
  }

  if (makeSlug && modelSlug) {
    return `/${makeSlug}/${modelSlug}`;
  }

  if (makeSlug && bodyType) {
    return `/${typesKey}/${bodyType}/${makeSlug}`;
  }

  if (makeSlug) {
    return `/${makeSlug}`;
  }

  if (bodyType) {
    return `/${typesKey}/${bodyType}`;
  }

  return '/';
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
  return `?${filtersQueryParamKey}=${encodedFiltersData}`;
};

const getTitleQuery = (
  filtersData?: FiltersData,
  titleQuery?: boolean
): string => {
  if (!titleQuery) return '';
  const query = `isTitleQAPass=${titleQuery}`;
  if (!filtersData || JSON.stringify(filtersData) === '{}') {
    return `?${query}`;
  }
  return `&${query}`;
};

export const getUrlFromFiltersData = (
  filtersData?: FiltersData,
  options?: GetUrlFromFiltersDataOptions
): string => {
  const addFiltersQueryParam = options && options.addFiltersQueryParam;
  const query = addFiltersQueryParam ? getQuery(filtersData) : '';
  const ignoreParamsBasePath = options && options.ignoreParamsBasePath;
  const actualParamsBasePath = ignoreParamsBasePath ? '' : paramsBasePath;
  const titleQuery = getTitleQuery(filtersData, options?.titleQuery);
  const url = `${actualParamsBasePath}${getParams(
    filtersData
  )}${query}${titleQuery}`;
  return url;
};

export const getFiltersDataFromFiltersQueryParam = (
  filtersQueryParam: string
): FiltersData | undefined => {
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

  const isCylinderArray = isEnumArray(Cylinder);
  if (isCylinderArray(parsed[Filters.CYLINDERS])) {
    filtersData[Filters.CYLINDERS] = parsed[Filters.CYLINDERS];
  }

  if (isBoolean(parsed[Filters.OTHER_CYLINDERS])) {
    filtersData[Filters.OTHER_CYLINDERS] = parsed[Filters.OTHER_CYLINDERS];
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

  const isTestDrive = isEnum(TestDrive);
  if (isTestDrive(parsed[Filters.TEST_DRIVE])) {
    filtersData[Filters.TEST_DRIVE] = parsed[Filters.TEST_DRIVE];
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

export const getFiltersDataFromTypesTokens = (
  tokens: string[]
): FiltersData | undefined => {
  const isBodyType = isEnum(BodyType);
  const bodyTypeToken = tokens[1];
  const bodyType: BodyType | undefined = isBodyType(bodyTypeToken)
    ? (bodyTypeToken as BodyType)
    : undefined;
  const makeSlug = tokens[2];
  if (!bodyType && !makeSlug) {
    return undefined;
  }
  return {
    [Filters.BODY_TYPES]: bodyType ? [bodyType] : undefined,
    [Filters.MAKE_AND_MODELS]: makeSlug
      ? [
          {
            makeSlug,
          },
        ]
      : undefined,
  };
};

export const getFiltersDataFromMmyTokens = (
  tokens: string[]
): FiltersData | undefined => {
  if (tokens.length === 1) {
    return {
      [Filters.MAKE_AND_MODELS]: [
        {
          makeSlug: tokens[0],
        },
      ],
    };
  }
  if (tokens.length === 2) {
    return {
      [Filters.MAKE_AND_MODELS]: [
        {
          makeSlug: tokens[0],
          modelSlugs: tokens[1] !== allModelsKey ? [tokens[1]] : undefined,
        },
      ],
    };
  }
  if (tokens.length === 3) {
    const yearTokens = tokens[2]
      .split('-')
      .map((item) => parseInt(item))
      .filter((item) => isNumber(item));

    let year: MaxAndMin | undefined;
    if (yearTokens.length === 1) {
      year = {
        max: yearTokens[0],
        min: yearTokens[0],
      };
    } else if (yearTokens.length === 2) {
      year = {
        max: yearTokens[1],
        min: yearTokens[0],
      };
    }

    return {
      [Filters.MAKE_AND_MODELS]: [
        {
          makeSlug: tokens[0],
          modelSlugs: tokens[1] !== allModelsKey ? [tokens[1]] : undefined,
        },
      ],
      [Filters.YEAR]: year,
    };
  }
  return undefined;
};

export const getFiltersDataFromParams = (
  params: string
): FiltersData | undefined => {
  const tokens = params.split('/').filter((item) => !!item);
  if (tokens.length === 0) {
    return undefined;
  }

  if (tokens[0] === typesKey) {
    return getFiltersDataFromTypesTokens(tokens);
  }

  return getFiltersDataFromMmyTokens(tokens);
};

export const getFiltersDataFromUrl = (url: string): FiltersData | undefined => {
  const questionMarkIndex = url.indexOf('?');
  const queryString =
    questionMarkIndex !== -1 ? url.substring(questionMarkIndex) : undefined;
  const query = new URLSearchParams(queryString);

  const filtersQueryParam = query.get(filtersQueryParamKey);

  if (filtersQueryParam) {
    return getFiltersDataFromFiltersQueryParam(filtersQueryParam);
  }

  const paramsBasePathIndex = url.indexOf(paramsBasePath);

  const paramsStartIndex =
    paramsBasePathIndex !== -1
      ? paramsBasePathIndex + paramsBasePath.length
      : 0;
  const paramsEndIndex =
    questionMarkIndex !== -1 ? questionMarkIndex : undefined;

  const params = url.substring(paramsStartIndex, paramsEndIndex);
  if (params) {
    return getFiltersDataFromParams(params);
  }

  return undefined;
};
