import * as yup from 'yup';
export declare enum SoldStatusInt {
    FOR_SALE = 0,
    SALE_PENDING = 1,
    SOLD = 2,
    DELIVERED = 3
}
export declare enum SoldStatus {
    FOR_SALE = "for_sale",
    SALE_PENDING = "sales_pending",
    SOLD = "sold",
    DELIVERED = "delivered"
}
export interface VehicleStatus {
    key: string;
    display: string;
}
export interface Vehicle {
    id: number;
    created: string;
    updated: string;
    vehicleVin: string;
    status: VehicleStatus;
    miles: number;
    purchasingID: number;
    pricingID: number | null;
    fyusionID: string;
    externalID: string;
    consignmentPartnerName: string | null;
    isListed: boolean;
    grade: string | null;
}
export declare type Inventory = {
    payload: Vehicle[];
    next_page: string | null;
};
export declare const inventorySchema: yup.ObjectSchema<Inventory>;
export declare type GetInventoryAvailabilityResponse = {
    data: Inventory;
};
export declare const getInventoryAvailabilityResponseSchema: yup.ObjectSchema<GetInventoryAvailabilityResponse>;
