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

export const deepCopyFiltersData = (filtersData: FiltersData): FiltersData => {
  return JSON.parse(JSON.stringify(filtersData)) as FiltersData;
};

export const resetFilter = (
  filter: Filters,
  filtersData: FiltersData | undefined
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[filter] = undefined;
  return newFiltersData;
};

export const resetFilters = (
  filters: Filters[],
  filtersData: FiltersData | undefined
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  filters.forEach((filter) => {
    newFiltersData[filter] = undefined;
  });
  return newFiltersData;
};

export const addBodyType = (
  bodyType: BodyType,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  const newBodyTypes = newFiltersData[Filters.BODY_TYPES] || [];
  newBodyTypes.push(bodyType);
  newFiltersData[Filters.BODY_TYPES] = newBodyTypes;
  return newFiltersData;
};

export const removeBodyType = (
  bodyType: BodyType,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  const existingBodyTypes = newFiltersData[Filters.BODY_TYPES] || [];
  const newBodyTypes = existingBodyTypes.filter((bt) => bt !== bodyType);
  newFiltersData[Filters.BODY_TYPES] =
    newBodyTypes.length > 0 ? newBodyTypes : undefined;
  return newFiltersData;
};

export const addColor = (
  color: Color,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  const newColors = newFiltersData[Filters.COLORS] || [];
  newColors.push(color);
  newFiltersData[Filters.COLORS] = newColors;
  return newFiltersData;
};

export const removeColor = (
  color: Color,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  const existingColors = newFiltersData[Filters.COLORS] || [];
  const newColors = existingColors.filter((c) => c !== color);
  newFiltersData[Filters.COLORS] = newColors.length > 0 ? newColors : undefined;
  return newFiltersData;
};

export const addDriveType = (
  driveType: DriveType,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  const newDriveTypes = newFiltersData[Filters.DRIVE_TYPE] || [];
  newDriveTypes.push(driveType);
  newFiltersData[Filters.DRIVE_TYPE] = newDriveTypes;
  return newFiltersData;
};

export const removeDriveType = (
  driveType: DriveType,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  const existingDriveTypes = newFiltersData[Filters.DRIVE_TYPE] || [];
  const newDriveTypes = existingDriveTypes.filter((dt) => dt !== driveType);
  newFiltersData[Filters.DRIVE_TYPE] =
    newDriveTypes.length > 0 ? newDriveTypes : undefined;
  return newFiltersData;
};

export const setTransmission = (
  transmission: Transmission,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[Filters.TRANSMISSION] = transmission;
  return newFiltersData;
};

export const addAllModels = (
  makeSlug: string,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  const existingMakeAndModels = newFiltersData[Filters.MAKE_AND_MODELS] || [];
  const newMakeAndModels = existingMakeAndModels.filter(
    (m) => m.makeSlug !== makeSlug
  );
  newMakeAndModels.push({ makeSlug });
  newFiltersData[Filters.MAKE_AND_MODELS] =
    newMakeAndModels.length > 0 ? newMakeAndModels : undefined;
  return newFiltersData;
};

export const removeAllModels = (
  makeSlug: string,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  const existingMakeAndModels = newFiltersData[Filters.MAKE_AND_MODELS] || [];
  const newMakeAndModels = existingMakeAndModels.filter(
    (m) => m.makeSlug !== makeSlug
  );
  newFiltersData[Filters.MAKE_AND_MODELS] =
    newMakeAndModels.length > 0 ? newMakeAndModels : undefined;
  return newFiltersData;
};

export const addModel = (
  makeSlug: string,
  modelSlug: string,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  const existingMakeAndModels = newFiltersData[Filters.MAKE_AND_MODELS] || [];
  const existingMake: Make = existingMakeAndModels.find(
    (m) => m.makeSlug === makeSlug
  ) || { makeSlug };
  const existingModels: string[] = existingMake.modelSlugs || [];
  const newModels: string[] = existingModels.includes(modelSlug)
    ? existingModels
    : existingModels.concat([modelSlug]);
  const newMake: Make = {
    makeSlug,
    modelSlugs: newModels,
  };
  const newMakeAndModels = existingMakeAndModels.filter(
    (m) => m.makeSlug !== makeSlug
  );
  newMakeAndModels.push(newMake);
  newFiltersData[Filters.MAKE_AND_MODELS] =
    newMakeAndModels.length > 0 ? newMakeAndModels : undefined;
  return newFiltersData;
};

export const removeModel = (
  makeSlug: string,
  modelSlug: string,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  const existingMakeAndModels = newFiltersData[Filters.MAKE_AND_MODELS] || [];
  const existingMake: Make = existingMakeAndModels.find(
    (m) => m.makeSlug === makeSlug
  ) || { makeSlug };
  const existingModels: string[] = existingMake.modelSlugs || [];
  const newModels: string[] = existingModels.includes(modelSlug)
    ? existingModels.filter((m) => m !== modelSlug)
    : existingModels;
  const newMake: Make | undefined =
    newModels.length > 0
      ? {
          makeSlug,
          modelSlugs: newModels,
        }
      : undefined;
  const newMakeAndModels = existingMakeAndModels.filter(
    (m) => m.makeSlug !== makeSlug
  );
  !!newMake && newMakeAndModels.push(newMake);
  newFiltersData[Filters.MAKE_AND_MODELS] =
    newMakeAndModels.length > 0 ? newMakeAndModels : undefined;
  return newFiltersData;
};

export const setMiles = (
  miles: MaxAndMin,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[Filters.MILES] = miles;
  return newFiltersData;
};

export const setPage = (
  page: number,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[Filters.PAGE] = page;
  return newFiltersData;
};

export const setPrice = (
  price: MaxAndMin,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[Filters.PRICE] = price;
  return newFiltersData;
};

export const setSearch = (
  search: string,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[Filters.SEARCH] = search;
  return newFiltersData;
};

export const setSort = (
  by: SortBy,
  direction: SortDirection,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[Filters.SORT] = {
    by,
    direction,
  };
  return newFiltersData;
};

export const setYear = (
  year: MaxAndMin,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[Filters.YEAR] = year;
  return newFiltersData;
};
