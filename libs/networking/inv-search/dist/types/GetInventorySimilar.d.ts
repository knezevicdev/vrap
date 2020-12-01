import { SimilarInventoryResponse, SimilarResponse } from './Inventory';
export interface GetInventorySimilarRequestData {
    min: number;
    vin: string;
    useVinCluster: boolean;
}
export declare const getInventorySimilarResponseSchema: import("yup").ObjectSchema<SimilarInventoryResponse>;
export declare type GetInventorySimilarResponse = SimilarInventoryResponse;
export declare type GetSimilarResponse = SimilarResponse;
