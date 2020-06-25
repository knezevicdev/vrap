import { Base64 } from 'js-base64';

export enum Filters {
  BODY_TYPES = 'bodytypes',
  COLORS = 'colors',
  DRIVE_TYPE = 'drivetype',
  MAKE_AND_MODELS = 'makesandmodels',
  MILES = 'miles',
  PAGE = 'page',
  PRICE = 'price',
  SEARCH = 'search',
  SORT = 'sort',
  TRANSMISSION = 'transmission',
  YEAR = 'year',
}

export enum BodyType {
  CONVERTIBLE = 'convertible',
  COUPE = 'coupe',
  HATCHBACK = 'hatchback',
  MINIVAN = 'minivan',
  SEDAN = 'sedan',
  SUV = 'suv',
  TRUCK = 'truck',
  WAGON = 'wagon',
}

export enum Color {
  BLACK = 'black',
  BLUE = 'blue',
  BROWN = 'brown',
  GOLD = 'gold',
  GREEN = 'green',
  GREY = 'grey',
  ORANGE = 'orange',
  PURPLE = 'purple',
  RED = 'red',
  SILVER = 'silver',
  WHITE = 'white',
  YELLOW = 'yellow',
}

export enum DriveType {
  FOUR_BY_FOUR = '4x4',
  AWD = 'awd',
  FWD = 'fwd',
  RWD = 'rwd',
}

export interface Make {
  makeSlug: string;
  modelSlugs?: string[];
}

export type MakeAndModels = Make[];

export interface MaxAndMin {
  min: number;
  max: number;
}

export enum SortBy {
  MILES = 'miles',
  PRICE = 'price',
  YEAR = 'year',
}

export enum SortDirection {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}

export interface Sort {
  by: SortBy;
  direction: SortDirection;
}

export enum Transmission {
  AUTO = 'auto',
  MANUAL = 'manual',
}

export interface FiltersData {
  [Filters.BODY_TYPES]?: BodyType[];
  [Filters.COLORS]?: Color[];
  [Filters.DRIVE_TYPE]?: DriveType[];
  [Filters.MAKE_AND_MODELS]?: MakeAndModels;
  [Filters.MILES]?: MaxAndMin;
  [Filters.PAGE]?: number;
  [Filters.PRICE]?: MaxAndMin;
  [Filters.SEARCH]?: string;
  [Filters.SORT]?: Sort;
  [Filters.TRANSMISSION]?: Transmission;
  [Filters.YEAR]?: MaxAndMin;
}

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
  return `/${descriptorParamArray.join('-')}`;
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
  const encodedFiltersData = Base64.encode(JSON.stringify(filtersData));
  return `?filters=${encodedFiltersData}`;
};

export const getUrlFromFiltersData = (filtersData?: FiltersData): string => {
  const url = `/cars${getParams(filtersData)}${getQuery(filtersData)}`;
  return url;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEnum = <T>(e: T) => (token: any): token is T[keyof T] =>
  Object.values(e).includes(token as T[keyof T]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEnumArray = <T>(e: T) => (token: any): token is T[keyof T][] => {
  if (!(token instanceof Array)) {
    return false;
  }
  const isT = isEnum(e);
  for (let i = 0; i < token.length; i++) {
    if (!isT(token[i])) {
      return false;
    }
  }
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNumber = (x: any): x is number => {
  return typeof x === 'number' && !isNaN(x);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isString = (x: any): x is string => {
  return typeof x === 'string';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isStringArray = (x: any): x is string[] => {
  if (!(x instanceof Array)) {
    return false;
  }
  for (let i = 0; i < x.length; i++) {
    if (typeof x[i] !== 'string') {
      return false;
    }
  }
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isObject = (x: any): boolean => {
  return typeof x === 'object' && x !== null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isMake = (x: any): x is Make => {
  if (!isObject(x)) {
    return false;
  }
  if (typeof x['makeSlug'] !== 'string') {
    return false;
  }
  if (typeof x['modelSlugs'] !== 'undefined') {
    if (!isStringArray(x['modelSlugs'])) {
      return false;
    }
  }
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isMakeAndModels = (x: any): x is MakeAndModels => {
  if (!(x instanceof Array)) {
    return false;
  }
  for (let i = 0; i < x.length; i++) {
    if (!isMake(x[i])) {
      return false;
    }
  }
  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isMaxAndMin = (x: any): x is MaxAndMin => {
  if (!isObject(x)) {
    return false;
  }
  if (!isNumber(x['max'])) {
    return false;
  }
  if (!isNumber(x['min'])) {
    return false;
  }
  return true;
};

const isSortBy = isEnum(SortBy);
const isSortDirection = isEnum(SortDirection);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isSort = (x: any): x is Sort => {
  if (!isObject(x)) {
    return false;
  }
  if (!isSortBy(x['by'])) {
    return false;
  }
  if (!isSortDirection(x['direction'])) {
    return false;
  }
  return true;
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
