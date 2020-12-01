import {
  BodyType as FiltersDataBodyType,
  CabType as FiltersDataCabType,
  Color as FiltersDataColor,
  Cylinder as FiltersDataCylinder,
  DriveType as FiltersDataDriveType,
  FuelType as FiltersDataFuelType,
  PopularFeatures as FiltersDataPopularFeatures,
  SortBy as FiltersDataSortBy,
  SortDirection as FiltersDataSortDirection,
  TestDrive as FiltersDataTestDrive,
  Transmission as FiltersDataTransmission,
} from '@vroom-web/catalog-url-integration';

export const INVENTORY_CARDS_PER_PAGE = 24;
export const POPULAR_CAR_LIMIT = 12;

export enum FuelTypeAPI {
  GASOLINE = 'gasoline',
  DIESEL = 'diesel',
  GAS_ELECTRIC_HYBRID = 'gas_electric_hybrid',
  PLUG_IN_HYBRID = 'plug_in_hybrid',
  ELECTRIC = 'electric',
  OTHER = 'other',
}

export enum FuelTypeDisplay {
  GASOLINE = 'Gasoline',
  DIESEL = 'Diesel',
  GAS_ELECTRIC_HYBRID = 'Gas/Electric Hybrid',
  PLUG_IN_HYBRID = 'Plug-in Hybrid',
  ELECTRIC = 'Electric',
  OTHER = 'Other',
}

export interface FuelType {
  api: FuelTypeAPI;
  display: FuelTypeDisplay;
  filtersDataValue: FiltersDataFuelType;
}

export const fuelTypes: FuelType[] = [
  {
    api: FuelTypeAPI.GASOLINE,
    display: FuelTypeDisplay.GASOLINE,
    filtersDataValue: FiltersDataFuelType.GASOLINE,
  },
  {
    api: FuelTypeAPI.DIESEL,
    display: FuelTypeDisplay.DIESEL,
    filtersDataValue: FiltersDataFuelType.DIESEL,
  },
  {
    api: FuelTypeAPI.GAS_ELECTRIC_HYBRID,
    display: FuelTypeDisplay.GAS_ELECTRIC_HYBRID,
    filtersDataValue: FiltersDataFuelType.GAS_ELECTRIC_HYBRID,
  },
  {
    api: FuelTypeAPI.PLUG_IN_HYBRID,
    display: FuelTypeDisplay.PLUG_IN_HYBRID,
    filtersDataValue: FiltersDataFuelType.PLUG_IN_HYBRID,
  },
  {
    api: FuelTypeAPI.ELECTRIC,
    display: FuelTypeDisplay.ELECTRIC,
    filtersDataValue: FiltersDataFuelType.ELECTRIC,
  },
  {
    api: FuelTypeAPI.OTHER,
    display: FuelTypeDisplay.OTHER,
    filtersDataValue: FiltersDataFuelType.OTHER,
  },
];

export enum CabTypeAPI {
  CREW = 'crew_cab',
  REGULAR = 'regular_cab',
  EXTENDED = 'extended_cab',
}

export enum CabTypeDisplay {
  CREW = '4 Door Crew Cab',
  REGULAR = '2 Door Standard Cab',
  EXTENDED = '4 Door Extended Cab',
}

export interface CabType {
  api: CabTypeAPI;
  display: CabTypeDisplay;
  filtersDataValue: FiltersDataCabType;
}

export const cabTypes: CabType[] = [
  {
    api: CabTypeAPI.CREW,
    display: CabTypeDisplay.CREW,
    filtersDataValue: FiltersDataCabType.CREW,
  },
  {
    api: CabTypeAPI.REGULAR,
    display: CabTypeDisplay.REGULAR,
    filtersDataValue: FiltersDataCabType.REGULAR,
  },
  {
    api: CabTypeAPI.EXTENDED,
    display: CabTypeDisplay.EXTENDED,
    filtersDataValue: FiltersDataCabType.EXTENDED,
  },
];

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

export interface BodyType {
  api: BodyTypeAPI;
  display: BodyTypeDisplay;
  filtersDataValue: FiltersDataBodyType;
}

export const bodyTypes: BodyType[] = [
  {
    api: BodyTypeAPI.SUV,
    display: BodyTypeDisplay.SUV,
    filtersDataValue: FiltersDataBodyType.SUV,
  },
  {
    api: BodyTypeAPI.SEDAN,
    display: BodyTypeDisplay.SEDAN,
    filtersDataValue: FiltersDataBodyType.SEDAN,
  },
  {
    api: BodyTypeAPI.TRUCK,
    display: BodyTypeDisplay.TRUCK,
    filtersDataValue: FiltersDataBodyType.TRUCK,
  },
  {
    api: BodyTypeAPI.COUPE,
    display: BodyTypeDisplay.COUPE,
    filtersDataValue: FiltersDataBodyType.COUPE,
  },
  {
    api: BodyTypeAPI.CONVERTIBLE,
    display: BodyTypeDisplay.CONVERTIBLE,
    filtersDataValue: FiltersDataBodyType.CONVERTIBLE,
  },
  {
    api: BodyTypeAPI.WAGON,
    display: BodyTypeDisplay.WAGON,
    filtersDataValue: FiltersDataBodyType.WAGON,
  },
  {
    api: BodyTypeAPI.HATCHBACK,
    display: BodyTypeDisplay.HATCHBACK,
    filtersDataValue: FiltersDataBodyType.HATCHBACK,
  },
  {
    api: BodyTypeAPI.MINIVAN,
    display: BodyTypeDisplay.MINIVAN,
    filtersDataValue: FiltersDataBodyType.MINIVAN,
  },
];

export enum ColorAPI {
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

export enum ColorDisplay {
  BLACK = 'Black',
  BLUE = 'Blue',
  BROWN = 'Brown',
  GOLD = 'Gold',
  GREEN = 'Green',
  GREY = 'Grey',
  ORANGE = 'Orange',
  PURPLE = 'Purple',
  RED = 'Red',
  SILVER = 'Silver',
  WHITE = 'White',
  YELLOW = 'Yellow',
}

export enum ColorValue {
  BLACK = '#041022',
  BLUE = '#1960d0',
  BROWN = '#914915',
  GOLD = '#F3D482',
  GREEN = '#308406',
  GREY = '#6c717a',
  ORANGE = '#f26900',
  PURPLE = '#8C3EA7',
  RED = '#e7131a',
  SILVER = '#d6d7da',
  WHITE = '#fff',
  YELLOW = '#ffd400',
}

export interface Color {
  api: ColorAPI;
  display: ColorDisplay;
  filtersDataValue: FiltersDataColor;
  value: ColorValue;
}

export const colors: Color[] = [
  {
    api: ColorAPI.WHITE,
    display: ColorDisplay.WHITE,
    filtersDataValue: FiltersDataColor.WHITE,
    value: ColorValue.WHITE,
  },
  {
    api: ColorAPI.BLACK,
    display: ColorDisplay.BLACK,
    filtersDataValue: FiltersDataColor.BLACK,
    value: ColorValue.BLACK,
  },
  {
    api: ColorAPI.GREY,
    display: ColorDisplay.GREY,
    filtersDataValue: FiltersDataColor.GREY,
    value: ColorValue.GREY,
  },
  {
    api: ColorAPI.SILVER,
    display: ColorDisplay.SILVER,
    filtersDataValue: FiltersDataColor.SILVER,
    value: ColorValue.SILVER,
  },
  {
    api: ColorAPI.RED,
    display: ColorDisplay.RED,
    filtersDataValue: FiltersDataColor.RED,
    value: ColorValue.RED,
  },
  {
    api: ColorAPI.ORANGE,
    display: ColorDisplay.ORANGE,
    filtersDataValue: FiltersDataColor.ORANGE,
    value: ColorValue.ORANGE,
  },
  {
    api: ColorAPI.BROWN,
    display: ColorDisplay.BROWN,
    filtersDataValue: FiltersDataColor.BROWN,
    value: ColorValue.BROWN,
  },
  {
    api: ColorAPI.GOLD,
    display: ColorDisplay.GOLD,
    filtersDataValue: FiltersDataColor.GOLD,
    value: ColorValue.GOLD,
  },
  {
    api: ColorAPI.YELLOW,
    display: ColorDisplay.YELLOW,
    filtersDataValue: FiltersDataColor.YELLOW,
    value: ColorValue.YELLOW,
  },
  {
    api: ColorAPI.GREEN,
    display: ColorDisplay.GREEN,
    filtersDataValue: FiltersDataColor.GREEN,
    value: ColorValue.GREEN,
  },
  {
    api: ColorAPI.BLUE,
    display: ColorDisplay.BLUE,
    filtersDataValue: FiltersDataColor.BLUE,
    value: ColorValue.BLUE,
  },
  {
    api: ColorAPI.PURPLE,
    display: ColorDisplay.PURPLE,
    filtersDataValue: FiltersDataColor.PURPLE,
    value: ColorValue.PURPLE,
  },
];

export enum CylinderApi {
  EIGHT = 8,
  SIX = 6,
  FOUR = 4,
}

export enum CylindersDisplay {
  EIGHT = '8 Cylinder',
  SIX = '6 Cylinder',
  FOUR = '4 Cylinder',
}

export interface Cylinder {
  api?: CylinderApi;
  display: CylindersDisplay;
  filtersDataValue: FiltersDataCylinder;
}

export const cylinders: Cylinder[] = [
  {
    api: CylinderApi.FOUR,
    display: CylindersDisplay.FOUR,
    filtersDataValue: FiltersDataCylinder.FOUR,
  },
  {
    api: CylinderApi.SIX,
    display: CylindersDisplay.SIX,
    filtersDataValue: FiltersDataCylinder.SIX,
  },
  {
    api: CylinderApi.EIGHT,
    display: CylindersDisplay.EIGHT,
    filtersDataValue: FiltersDataCylinder.EIGHT,
  },
];

export enum DriveTypeAPI {
  FOUR_BY_FOUR = '4x4',
  AWD = 'AWD',
  FWD = 'FWD',
  RWD = 'RWD',
}

export enum DriveTypeDisplay {
  FOUR_BY_FOUR = '4x4',
  AWD = 'AWD',
  FWD = 'FWD',
  RWD = 'RWD',
}

export interface DriveType {
  api: DriveTypeAPI;
  display: DriveTypeDisplay;
  filtersDataValue: FiltersDataDriveType;
}

export const driveTypes: DriveType[] = [
  {
    api: DriveTypeAPI.FOUR_BY_FOUR,
    display: DriveTypeDisplay.FOUR_BY_FOUR,
    filtersDataValue: FiltersDataDriveType.FOUR_BY_FOUR,
  },
  {
    api: DriveTypeAPI.AWD,
    display: DriveTypeDisplay.AWD,
    filtersDataValue: FiltersDataDriveType.AWD,
  },
  {
    api: DriveTypeAPI.FWD,
    display: DriveTypeDisplay.FWD,
    filtersDataValue: FiltersDataDriveType.FWD,
  },
  {
    api: DriveTypeAPI.RWD,
    display: DriveTypeDisplay.RWD,
    filtersDataValue: FiltersDataDriveType.RWD,
  },
];

export const heatedSeatsApi = [
  'Heated Seat Cushion',
  'Heated Seats',
  'Rear Heated Seats',
  '2nd Row Heated Seats',
  '3rd Row Heated Seats',
];

export const rearViewCameraApi = [
  'Rear View Camera',
  'Rear View Mirror Camera',
];

export const sunroofMoonroofApi = [
  'Dual Power Sun/Moonroof',
  'Dual Sun/Moonroof',
  'Dual-Pane Panoramic Power Sunroof',
  'Panorama Sunroof',
  'Power Panorama Sunroof',
  'Power Sun/Moonroof',
  'Sun/Moonroof',
];

export const thirdRowSeatingApi = [
  'Third Row Removable Seats',
  'Third Row Seating (Power)',
  'Third Row Seating',
];

export enum PopularFeatureApi {
  ANDROID_AUTO = 'Android Auto',
  APPLE_CAR_PLAY = 'Apple Carplay',
  HEATED_SEATS = 'Heated Seats',
  REAR_VIEW_CAMERA = 'Rear View Camera',
  REMOTE_START = 'Remote Start',
  SUNROOF_MOONROOF = 'Sunroof or Moonroof',
  THIRD_ROW_SEATING = 'Third Row Seating',
}

export enum PopularFeatureDisplay {
  ANDROID_AUTO = 'Android Auto',
  APPLE_CAR_PLAY = 'Apple CarPlay',
  HEATED_SEATS = 'Heated Seats',
  REAR_VIEW_CAMERA = 'Rear View Camera',
  REMOTE_START = 'Remote Start',
  SUNROOF_MOONROOF = 'Sunroof or Moonroof',
  THIRD_ROW_SEATING = 'Third Row Seating',
}

export interface PopularFeature {
  api?: PopularFeatureApi | string[];
  display: PopularFeatureDisplay;
  filtersDataValue: FiltersDataPopularFeatures;
}

export const popularFeatures: PopularFeature[] = [
  {
    api: PopularFeatureApi.ANDROID_AUTO,
    display: PopularFeatureDisplay.ANDROID_AUTO,
    filtersDataValue: FiltersDataPopularFeatures.ANDROID_AUTO,
  },
  {
    api: PopularFeatureApi.APPLE_CAR_PLAY,
    display: PopularFeatureDisplay.APPLE_CAR_PLAY,
    filtersDataValue: FiltersDataPopularFeatures.APPLE_CAR_PLAY,
  },
  {
    api: heatedSeatsApi,
    display: PopularFeatureDisplay.HEATED_SEATS,
    filtersDataValue: FiltersDataPopularFeatures.HEATED_SEATS,
  },
  {
    api: rearViewCameraApi,
    display: PopularFeatureDisplay.REAR_VIEW_CAMERA,
    filtersDataValue: FiltersDataPopularFeatures.REAR_VIEW_CAMERA,
  },
  {
    api: PopularFeatureApi.REMOTE_START,
    display: PopularFeatureDisplay.REMOTE_START,
    filtersDataValue: FiltersDataPopularFeatures.REMOTE_START,
  },
  {
    api: sunroofMoonroofApi,
    display: PopularFeatureDisplay.SUNROOF_MOONROOF,
    filtersDataValue: FiltersDataPopularFeatures.SUNROOF_MOONROOF,
  },
  {
    api: thirdRowSeatingApi,
    display: PopularFeatureDisplay.THIRD_ROW_SEATING,
    filtersDataValue: FiltersDataPopularFeatures.THIRD_ROW_SEATING,
  },
];

export enum SortAPIBy {
  LISTING_PRICE = 'listingPrice',
  MILES = 'miles',
  YEAR = 'year',
  GEO = 'geo',
}

export enum SortAPIDirection {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}

export enum SortDisplay {
  NEWEST_MODEL = 'Newest Model',
  LOWEST_PRICE = 'Lowest Price',
  HIGHEST_PRICE = 'Highest Price',
  LOWEST_MILES = 'Lowest Miles',
}

export interface Sort {
  apiBy: SortAPIBy;
  apiDirection: SortAPIDirection;
  display: SortDisplay;
  filtersDataByValue: FiltersDataSortBy;
  filtersDataDirectionValue: FiltersDataSortDirection;
}

export const sorts: Sort[] = [
  {
    apiBy: SortAPIBy.YEAR,
    apiDirection: SortAPIDirection.DESCENDING,
    display: SortDisplay.NEWEST_MODEL,
    filtersDataByValue: FiltersDataSortBy.YEAR,
    filtersDataDirectionValue: FiltersDataSortDirection.DESCENDING,
  },
  {
    apiBy: SortAPIBy.LISTING_PRICE,
    apiDirection: SortAPIDirection.ASCENDING,
    display: SortDisplay.LOWEST_PRICE,
    filtersDataByValue: FiltersDataSortBy.PRICE,
    filtersDataDirectionValue: FiltersDataSortDirection.ASCENDING,
  },
  {
    apiBy: SortAPIBy.LISTING_PRICE,
    apiDirection: SortAPIDirection.DESCENDING,
    display: SortDisplay.HIGHEST_PRICE,
    filtersDataByValue: FiltersDataSortBy.PRICE,
    filtersDataDirectionValue: FiltersDataSortDirection.DESCENDING,
  },
  {
    apiBy: SortAPIBy.MILES,
    apiDirection: SortAPIDirection.ASCENDING,
    display: SortDisplay.LOWEST_MILES,
    filtersDataByValue: FiltersDataSortBy.MILES,
    filtersDataDirectionValue: FiltersDataSortDirection.ASCENDING,
  },
];

export enum TestDriveAPI {
  AVAILABLE = 'available',
}

export enum TestDriveDisplay {
  AVAILABLE = 'Test Drive Available',
}

export interface TestDrive {
  api: TestDriveAPI;
  display: TestDriveDisplay;
  filtersDataValue: FiltersDataTestDrive;
}

export const testDrives: TestDrive[] = [
  {
    api: TestDriveAPI.AVAILABLE,
    display: TestDriveDisplay.AVAILABLE,
    filtersDataValue: FiltersDataTestDrive.AVAILABLE,
  },
];

export enum TransmissionAPI {
  AUTO = '0',
  MANUAL = '1',
}

export enum TransmissionDisplay {
  AUTO = 'Automatic Only',
  MANUAL = 'Manual Only',
}

export interface Transmission {
  api: TransmissionAPI;
  display: TransmissionDisplay;
  filtersDataValue: FiltersDataTransmission;
}

export const transmissions: Transmission[] = [
  {
    api: TransmissionAPI.AUTO,
    display: TransmissionDisplay.AUTO,
    filtersDataValue: FiltersDataTransmission.AUTO,
  },
  {
    api: TransmissionAPI.MANUAL,
    display: TransmissionDisplay.MANUAL,
    filtersDataValue: FiltersDataTransmission.MANUAL,
  },
];
