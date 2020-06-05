export interface Inventory {
  data: Data;
}

export interface Data {
  hits: Hits;
  aggregations: Aggregations;
}

export interface Aggregations {
  make_count: MakeCount;
}

export interface MakeCount {
  buckets: MakeBuckets[];
}

export interface MakeBuckets {
  key: string;
  doc_count: number;
  model_count: ModelCount;
}

export interface ModelCount {
  buckets: ModelBuckets[];
}

export interface ModelBuckets {
  key: string;
  doc_count: number;
}

export interface Hits {
  total: number;
  hits: Hit[];
}

export interface Hit {
  _source: Car;
}

export interface Car {
  vin: string;
  bodyType: string;
  interiorPhotoUrl: string;
  diesel: number;
  leadFlagPhotoUrl: string;
  listingPrice: number;
  color: string;
  year: number;
  leadFlagPhotoUrlHiRes: string;
  subjectLine: string;
  warrantyRemaining: string;
  miles: number;
  interiorPhotoUrlHiRes: string;
  dvd: number;
  transmission: string;
  trim: string;
  engine: string;
  hiresPhotos: string[];
  warranty: number;
  model: string;
  extColor: string;
  text: string;
  engId: number;
  bodyId: number;
  make: string;
  vehicleType: string;
  doorCount: number;
  roof: number;
  nav: number;
  warrantyOriginal: string;
  driveType: string;
  intColor: string;
  cylinders: number;
  awd: number;
  fuelType: string;
  leadPhotoUrlHiRes: string;
  leadPhotoUrl: string;
  style: string;
  optionalFeatures: string;
  zone: string;
  soldStatus: number;
  otherPhotos: string[];
  defectPhotos: [{ url: string; defectType: string; location: string }];
  ownerCount: number;
  cityMpg: number;
  highwayMpg: number;
  // TODO: replace inventoryId with externalId when the API supplies it.
  inventoryId: number;
  consignmentPartnerId?: string;
  hasStockPhotos: boolean;
}

export enum SoldStatus {
  ALL_CARS = 'all_cars',
  FOR_SALE = 'for_sale',
  SALE_PENDING = 'sale_pending',
  SOLD = 'sold',
  DELIVERED = 'delivered',
}

export interface SearchParams {
  offset?: number;
  fulldetails?: boolean;
  limit?: number;
  testdriveonly?: boolean;
  make?: string[];
  model?: string[];
  bodytype?: string[];
  color?: string[];
  year?: {} | { min: number; max: number };
  price?: {} | { min: number; max: number };
  miles?: {} | { min: number; max: number };
  transmissionid?: string;
  drivetype?: string[];
  sortby?: string;
  sortdirection?: string;
  searchall?: string;
  vin?: string[];
  'sold-status'?: SoldStatus;
  source?: string;
}
