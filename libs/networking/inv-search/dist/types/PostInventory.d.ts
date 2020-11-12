import { InventoryResponse } from './Inventory';
export declare enum SoldStatus {
    ALL_CARS = "all_cars",
    FOR_SALE = "for_sale",
    SALE_PENDING = "sale_pending",
    SOLD = "sold",
    DELIVERED = "delivered"
}
export interface PostInventoryRequestData {
    offset?: number;
    fulldetails?: boolean;
    limit?: number;
    testdriveonly?: boolean;
    make?: string[];
    makeSlug?: string[];
    model?: string[];
    modelSlug?: string[];
    bodytype?: string[];
    color?: string[];
    year?: {} | {
        min: number;
        max: number;
    };
    price?: {} | {
        min: number;
        max: number;
    };
    miles?: {} | {
        min: number;
        max: number;
    };
    transmissionid?: string;
    drivetype?: string[];
    sortAgedDirection?: string;
    sortby?: string;
    sortdirection?: string;
    searchall?: string;
    vin?: string[];
    'sold-status'?: SoldStatus;
    source?: string;
    geo?: {
        lat: string;
        long: string;
    };
    isTitleQAPass?: boolean;
    cylinders?: number[];
    cylindersShowOther?: boolean;
    fuelType?: string[];
    optionalFeatures?: string[];
    combinedMpg?: {
        min: number;
    };
}
export declare const postInventoryResponseSchema: import("yup").ObjectSchema<InventoryResponse>;
export declare type PostInventoryResponse = InventoryResponse;
