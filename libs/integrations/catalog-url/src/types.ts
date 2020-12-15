export enum Filters {
  BODY_TYPES = 'bodytypes',
  CAB_TYPE = 'cabtype',
  COLORS = 'colors',
  DRIVE_TYPE = 'drivetype',
  MAKE_AND_MODELS = 'makesandmodels',
  MILES = 'miles',
  PAGE = 'page',
  PRICE = 'price',
  SEARCH = 'search',
  SORT = 'sort',
  TEST_DRIVE = 'testdrive',
  TRANSMISSION = 'transmission',
  YEAR = 'year',
  CYLINDERS = 'cylinders',
  OTHER_CYLINDERS = 'othercylinders',
  FUEL_TYPE = 'fueltype',
  POPULAR_FEATURES = 'optionalfeatures',
  FUEL_EFFICIENCY = 'combinedmpg',
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

export enum CabType {
  CREW = 'crew',
  REGULAR = 'regular',
  EXTENDED = 'extended',
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

export enum TestDrive {
  AVAILABLE = 'available',
}

export enum Transmission {
  AUTO = 'auto',
  MANUAL = 'manual',
}

export enum Cylinder {
  FOUR = '4',
  SIX = '6',
  EIGHT = '8',
}

export enum FuelType {
  GASOLINE = 'gasoline',
  ELECTRIC = 'electric',
  PLUG_IN_HYBRID = 'pluginhybrid',
  GAS_ELECTRIC_HYBRID = 'gaselectrichybrid',
  DIESEL = 'diesel',
  OTHER = 'other',
}

export enum PopularFeatures {
  ANDROID_AUTO = 'Android Auto',
  APPLE_CAR_PLAY = 'Apple CarPlay',
  HEATED_SEATS = 'Heated Seats',
  REAR_VIEW_CAMERA = 'Rear View Camera',
  REMOTE_START = 'Remote Start',
  SUNROOF_MOONROOF = 'Sunroof or Moonroof',
  THIRD_ROW_SEATING = 'Third Row Seating',
}

export interface FuelEfficiency {
  min: number;
}

export interface FiltersData {
  [Filters.BODY_TYPES]?: BodyType[];
  [Filters.CAB_TYPE]?: CabType[];
  [Filters.COLORS]?: Color[];
  [Filters.DRIVE_TYPE]?: DriveType[];
  [Filters.MAKE_AND_MODELS]?: MakeAndModels;
  [Filters.MILES]?: MaxAndMin;
  [Filters.PAGE]?: number;
  [Filters.PRICE]?: MaxAndMin;
  [Filters.SEARCH]?: string;
  [Filters.SORT]?: Sort;
  [Filters.TEST_DRIVE]?: TestDrive;
  [Filters.TRANSMISSION]?: Transmission;
  [Filters.YEAR]?: MaxAndMin;
  [Filters.CYLINDERS]?: Cylinder[];
  [Filters.OTHER_CYLINDERS]?: boolean;
  [Filters.FUEL_TYPE]?: FuelType[];
  [Filters.POPULAR_FEATURES]?: PopularFeatures[];
  [Filters.FUEL_EFFICIENCY]?: FuelEfficiency;
}

export interface GetUrlFromFiltersDataOptions {
  addFiltersQueryParam?: boolean;
  ignoreParamsBasePath?: boolean;
  titleQuery?: boolean;
}
