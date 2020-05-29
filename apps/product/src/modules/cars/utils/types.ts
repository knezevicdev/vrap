export const ALL_KEY = 'all';
export const INVENTORY_LIMIT = 24;
export const POPULAR_CAR_LIMIT = 12;

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
  RECOMMENDED = 'Recommended',
  NEWEST_MODEL = 'Newest Model',
  LOWEST_PRICE = 'Lowest Price',
  HIGHEST_PRICE = 'Highest Price',
  LOWEST_MILES = 'Lowest Miles',
}

export enum Filter {
  MAKE_AND_MODEL = 'Make & Model',
  BODY_TYPE = 'Body Type',
  COLOR = 'Color',
  YEAR = 'Year',
  PRICE = 'Price',
  MILES = 'Miles',
  ENGINE_AND_DRIVETRAIN = 'Engine & Drivetrain',
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

export interface FiltersString {
  [Filters.MAKE_AND_MODELS]?: MakeAndModels;
  [Filters.BODY_TYPES]?: string[];
  [Filters.COLORS]?: string[];
  [Filters.DRIVE_TYPE]?: string[];
  [Filters.SORT]?: SortValue;
  [Filters.SEARCH]?: string;
}

export interface FiltersData extends FiltersString {
  [Filters.YEAR]?: MaxAndMin;
  [Filters.PRICE]?: MaxAndMin;
  [Filters.MILES]?: MaxAndMin;
  [Filters.TRANSMISSION]?: number;
  [Filters.PAGE]?: number;
}

export enum Pathname {
  WITH_PARAMS = '/cars/[...params]',
  WITHOUT_PARAMS = '/cars',
}

export interface MaxAndMin {
  min: number;
  max: number;
}

export interface MakeAndModels {
  [make: string]: string[];
}

export interface BodyType {
  display: string;
  url: string;
  api: string;
}

export enum BodyTypeURL {
  SUV = 'suv',
  SEDAN = 'sedan',
  TRUCK = 'truck',
  COUPE = 'coupe',
  CONVERTIBLE = 'convertible',
  WAGON = 'wagon',
  HATCHBACK = 'hatchback',
  MINIVAN = 'minivan',
}

export enum BodyTypeDisplay {
  SUV = 'SUV',
  SEDAN = 'Sedan',
  TRUCK = 'Truck',
  COUPE = 'Coupe',
  CONVERTIBLE = 'Convertible',
  WAGON = 'Wagon',
  HATCHBACK = 'Hatchback',
  MINIVAN = 'Minivan',
}

export enum BodyTypeAPI {
  SUV = 'SUV',
  SEDAN = 'Sedan',
  TRUCK = 'Pickup Truck',
  COUPE = 'Coupe',
  CONVERTIBLE = 'Convertible',
  WAGON = 'Wagon',
  HATCHBACK = 'Hatchback',
  MINIVAN = 'Van Minivan',
}

export const bodyTypes = [
  {
    display: BodyTypeDisplay.SUV,
    url: BodyTypeURL.SUV,
    api: BodyTypeAPI.SUV,
  },
  {
    display: BodyTypeDisplay.SEDAN,
    url: BodyTypeURL.SEDAN,
    api: BodyTypeAPI.SEDAN,
  },
  {
    display: BodyTypeDisplay.TRUCK,
    url: BodyTypeURL.TRUCK,
    api: BodyTypeAPI.TRUCK,
  },
  {
    display: BodyTypeDisplay.COUPE,
    url: BodyTypeURL.COUPE,
    api: BodyTypeAPI.COUPE,
  },
  {
    display: BodyTypeDisplay.CONVERTIBLE,
    url: BodyTypeURL.CONVERTIBLE,
    api: BodyTypeAPI.CONVERTIBLE,
  },
  {
    display: BodyTypeDisplay.WAGON,
    url: BodyTypeURL.WAGON,
    api: BodyTypeAPI.WAGON,
  },
  {
    display: BodyTypeDisplay.HATCHBACK,
    url: BodyTypeURL.HATCHBACK,
    api: BodyTypeAPI.HATCHBACK,
  },
  {
    display: BodyTypeDisplay.MINIVAN,
    url: BodyTypeURL.MINIVAN,
    api: BodyTypeAPI.MINIVAN,
  },
];
