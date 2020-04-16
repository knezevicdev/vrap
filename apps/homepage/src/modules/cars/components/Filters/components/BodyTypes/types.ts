import BodyTypesViewModel from './ViewModel';

export interface BodyTypesViewProps {
  viewModel: BodyTypesViewModel;
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
