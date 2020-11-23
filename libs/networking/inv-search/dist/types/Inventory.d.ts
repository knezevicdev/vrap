import * as yup from 'yup';
export declare enum DefectType {
    SCRATCH = "Scratch",
    OXIDATION = "Oxidation",
    SPIDER_CRACKING = "Spider Cracking",
    CHIP = "Chip",
    RUN = "Run",
    DENT = "Dent"
}
export interface DefectPhoto {
    url: string;
    defectType: DefectType;
    location: string;
}
export declare enum SoldStatusInt {
    FOR_SALE = 0,
    SALE_PENDING = 1,
    SOLD = 2,
    DELIVERED = 3
}
export declare type Car = {
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
    modelSlug: string;
    extColor: string;
    text: string;
    engId: number;
    bodyId: number;
    make: string;
    makeSlug: string;
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
    soldStatus: SoldStatusInt;
    otherPhotos: string[] | null;
    defectPhotos: DefectPhoto[] | null;
    ownerCount: number;
    cityMpg: number;
    highwayMpg: number;
    inventoryId: number;
    consignmentPartnerId: string;
    hasStockPhotos: boolean;
    height: number;
    length: number;
    width: number;
    groundClearance: number;
    wheelBase: number;
    frontTrackWidth: number;
    rearTrackWidth: number;
    spincarSpinUrl?: string | null;
    isAvailableToSell: boolean;
    vinClusterPrimary: number | null;
    vinClusterSecondary: number | null;
};
export declare const carSchema: yup.ObjectSchema<Car>;
export declare type Hit = {
    _source: Car;
};
export declare const hitSchema: yup.ObjectSchema<Hit>;
export declare type Hits = {
    total: number;
    hits: Hit[];
};
export declare const hitsSchema: yup.ObjectSchema<Hits>;
export declare type ModelBucket = {
    slug: string;
    key: string;
    doc_count: number;
};
export declare const modelBucketSchema: yup.ObjectSchema<ModelBucket>;
export declare type ModelCount = {
    buckets: ModelBucket[];
};
export declare const modelCountSchema: yup.ObjectSchema<ModelCount>;
export declare type MakeBucket = {
    slug: string;
    key: string;
    doc_count: number;
    model_count: ModelCount;
};
export declare const makeBucketSchema: yup.ObjectSchema<MakeBucket>;
export declare type MakeCount = {
    buckets: MakeBucket[];
};
export declare const makeCountSchema: yup.ObjectSchema<MakeCount>;
export declare type Aggregations = {
    make_count: MakeCount;
};
export declare const aggregationsSchema: yup.ObjectSchema<Aggregations>;
export declare type Data = {
    hits: Hits;
    aggregations: Aggregations;
};
export declare const dataSchema: yup.ObjectSchema<Data>;
export declare type InventoryResponse = {
    data: Data;
};
export declare const inventoryResponseSchema: yup.ObjectSchema<InventoryResponse>;
