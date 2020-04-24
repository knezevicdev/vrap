/* eslint-disable @typescript-eslint/camelcase */
import * as yup from 'yup';

export const carSchema = yup
  .object({
    vin: yup.string(),
    bodyType: yup.string(),
    interiorPhotoUrl: yup.string(),
    diesel: yup.number(),
    leadFlagPhotoUrl: yup.string(),
    listingPrice: yup.number(),
    color: yup.string(),
    year: yup.number(),
    leadFlagPhotoUrlHiRes: yup.string(),
    subjectLine: yup.string(),
    warrantyRemaining: yup.string(),
    miles: yup.number(),
    interiorPhotoUrlHiRes: yup.string(),
    dvd: yup.number(),
    transmission: yup.string(),
    trim: yup.string(),
    engine: yup.string(),
    hiresPhotos: yup.array(yup.string()),
    warranty: yup.number(),
    model: yup.string(),
    extColor: yup.string(),
    text: yup.string(),
    engId: yup.number(),
    bodyId: yup.number(),
    make: yup.string(),
    vehicleType: yup.string(),
    doorCount: yup.number(),
    roof: yup.number(),
    nav: yup.number(),
    warrantyOriginal: yup.string(),
    driveType: yup.string(),
    intColor: yup.string(),
    cylinders: yup.number(),
    awd: yup.number(),
    fuelType: yup.string(),
    leadPhotoUrlHiRes: yup.string(),
    leadPhotoUrl: yup.string(),
    style: yup.string(),
    optionalFeatures: yup.string(),
    zone: yup.string(),
    soldStatus: yup.number(),
    otherPhotos: yup.array(yup.string()),
    ownerCount: yup.number(),
    cityMpg: yup.number(),
    highwayMpg: yup.number(),
    // TODO: replace inventoryId with externalId when the API supplies it.
    inventoryId: yup.number(),
  })
  .strict(true);
export type Car = yup.InferType<typeof carSchema>;

export const hitSchema = yup
  .object<{ _source: Car }>({
    _source: carSchema,
  })
  .strict(true);
export type Hit = yup.InferType<typeof hitSchema>;

export const hitsSchema = yup
  .object<{ total: number; hits: Hit[] }>({
    total: yup.number(),
    hits: yup.array(hitSchema),
  })
  .strict(true);
export type Hits = yup.InferType<typeof hitsSchema>;

export const modelBucketSchema = yup
  .object({
    key: yup.string(),
    doc_count: yup.number(),
  })
  .strict(true);
export type ModelBucket = yup.InferType<typeof modelBucketSchema>;

export const modelCountSchema = yup
  .object<{ buckets: ModelBucket[] }>({
    buckets: yup.array(modelBucketSchema),
  })
  .strict(true);
export type ModelCount = yup.InferType<typeof modelCountSchema>;

export const makeBucketSchema = yup
  .object<{ key: string; doc_count: number; model_count: ModelCount }>({
    key: yup.string(),
    doc_count: yup.number(),
    model_count: modelCountSchema,
  })
  .strict(true);
export type MakeBucket = yup.InferType<typeof makeBucketSchema>;

export const makeCountSchema = yup
  .object<{ buckets: MakeBucket[] }>({
    buckets: yup.array(makeBucketSchema),
  })
  .strict(true);
export type MakeCount = yup.InferType<typeof makeCountSchema>;

export const aggregationsSchema = yup
  .object<{ make_count: MakeCount }>({
    make_count: makeCountSchema,
  })
  .strict(true);
export type Aggregations = yup.InferType<typeof aggregationsSchema>;

export const dataSchema = yup
  .object<{ hits: Hits; aggregations: Aggregations }>({
    hits: hitsSchema,
    aggregations: aggregationsSchema,
  })
  .strict(true);
export type Data = yup.InferType<typeof dataSchema>;

export const inventoryResponseSchema = yup
  .object<{ data: Data }>({
    data: dataSchema,
  })
  .strict(true);
export type InventoryResponse = yup.InferType<typeof inventoryResponseSchema>;
