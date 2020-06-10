/* eslint-disable @typescript-eslint/camelcase */
import * as yup from 'yup';

export type Car = {
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
  hiresPhotos: string[] | null;
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
  otherPhotos: string[] | null;
  ownerCount: number;
  cityMpg: number;
  highwayMpg: number;
  // TODO: replace inventoryId with externalId when the API supplies it.
  inventoryId: number;
  consignmentPartnerId: string;
  hasStockPhotos: boolean;
};
export const carSchema: yup.ObjectSchema<Car> = yup
  .object({
    vin: yup.string().defined(),
    bodyType: yup.string().defined(),
    interiorPhotoUrl: yup.string().defined(),
    diesel: yup.number().defined(),
    leadFlagPhotoUrl: yup.string().defined(),
    listingPrice: yup.number().defined(),
    color: yup.string().defined(),
    year: yup.number().defined(),
    leadFlagPhotoUrlHiRes: yup.string().defined(),
    subjectLine: yup.string().defined(),
    warrantyRemaining: yup.string().defined(),
    miles: yup.number().defined(),
    interiorPhotoUrlHiRes: yup.string().defined(),
    dvd: yup.number().defined(),
    transmission: yup.string().defined(),
    trim: yup.string().defined(),
    engine: yup.string().defined(),
    hiresPhotos: yup.array(yup.string().defined()).defined().nullable(),
    warranty: yup.number().defined(),
    model: yup.string().defined(),
    extColor: yup.string().defined(),
    text: yup.string().defined(),
    engId: yup.number().defined(),
    bodyId: yup.number().defined(),
    make: yup.string().defined(),
    vehicleType: yup.string().defined(),
    doorCount: yup.number().defined(),
    roof: yup.number().defined(),
    nav: yup.number().defined(),
    warrantyOriginal: yup.string().defined(),
    driveType: yup.string().defined(),
    intColor: yup.string().defined(),
    cylinders: yup.number().defined(),
    awd: yup.number().defined(),
    fuelType: yup.string().defined(),
    leadPhotoUrlHiRes: yup.string().defined(),
    leadPhotoUrl: yup.string().defined(),
    style: yup.string().defined(),
    optionalFeatures: yup.string().defined(),
    zone: yup.string().defined(),
    soldStatus: yup.number().defined(),
    otherPhotos: yup.array(yup.string().defined()).defined().nullable(),
    ownerCount: yup.number().defined(),
    cityMpg: yup.number().defined(),
    highwayMpg: yup.number().defined(),
    // TODO: replace inventoryId with externalId when the API supplies it.
    inventoryId: yup.number().defined(),
    consignmentPartnerId: yup.string().defined(),
    hasStockPhotos: yup.boolean().defined(),
  })
  .defined()
  .strict(true);

export type Hit = {
  _source: Car;
};
export const hitSchema: yup.ObjectSchema<Hit> = yup
  .object({
    _source: carSchema,
  })
  .defined()
  .strict(true);

export type Hits = {
  total: number;
  hits: Hit[];
};
export const hitsSchema: yup.ObjectSchema<Hits> = yup
  .object({
    total: yup.number().defined(),
    hits: yup.array(hitSchema).defined(),
  })
  .defined()
  .strict(true);

export type ModelBucket = {
  key: string;
  doc_count: number;
};
export const modelBucketSchema: yup.ObjectSchema<ModelBucket> = yup
  .object({
    key: yup.string().defined(),
    doc_count: yup.number().defined(),
  })
  .defined()
  .strict(true);

export type ModelCount = {
  buckets: ModelBucket[];
};
export const modelCountSchema: yup.ObjectSchema<ModelCount> = yup
  .object({
    buckets: yup.array(modelBucketSchema).defined(),
  })
  .defined()
  .strict(true);

export type MakeBucket = {
  key: string;
  doc_count: number;
  model_count: ModelCount;
};
export const makeBucketSchema: yup.ObjectSchema<MakeBucket> = yup
  .object({
    key: yup.string().defined(),
    doc_count: yup.number().defined(),
    model_count: modelCountSchema,
  })
  .defined()
  .strict(true);

export type MakeCount = {
  buckets: MakeBucket[];
};
export const makeCountSchema: yup.ObjectSchema<MakeCount> = yup
  .object({
    buckets: yup.array(makeBucketSchema).defined(),
  })
  .defined()
  .strict(true);

export type Aggregations = {
  make_count: MakeCount;
};
export const aggregationsSchema: yup.ObjectSchema<Aggregations> = yup
  .object({
    make_count: makeCountSchema,
  })
  .defined()
  .strict(true);

export type Data = {
  hits: Hits;
  aggregations: Aggregations;
};
export const dataSchema: yup.ObjectSchema<Data> = yup
  .object({
    hits: hitsSchema,
    aggregations: aggregationsSchema,
  })
  .defined()
  .strict(true);

export type InventoryResponse = {
  data: Data;
};
export const inventoryResponseSchema: yup.ObjectSchema<InventoryResponse> = yup
  .object({
    data: dataSchema,
  })
  .defined()
  .strict(true);
