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

export interface GetUrlFromFiltersDataOptions {
  addFiltersQueryParam?: boolean;
  ignoreParamsBasePath?: boolean;
}
