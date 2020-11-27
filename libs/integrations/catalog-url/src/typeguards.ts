import {
  FuelEfficiency,
  Make,
  MakeAndModels,
  MaxAndMin,
  Sort,
  SortBy,
  SortDirection,
} from './types';

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
export const isBoolean = (x: any): x is boolean => {
  return typeof x === 'boolean';
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isFuelEfficiency = (x: any): x is FuelEfficiency => {
  if (!isObject(x)) {
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
