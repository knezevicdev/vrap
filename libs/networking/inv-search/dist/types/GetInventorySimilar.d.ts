import { InventoryResponse } from './Inventory';
export interface GetInventorySimilarRequestData {
    min: number;
    vin: string;
    useVinCluster: boolean;
}
export declare const getInventorySimilarResponseSchema: import("yup").ObjectSchema<InventoryResponse>;
export declare type GetInventorySimilarResponse = InventoryResponse;
