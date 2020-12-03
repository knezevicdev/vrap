import {
  SimilarInventoryResponse,
  similarInventoryResponseSchema,
  SimilarResponse,
} from './Inventory';

export interface GetInventorySimilarRequestData {
  min: number;
  vin: string;
  useVinCluster: boolean;
}

export const getInventorySimilarResponseSchema = similarInventoryResponseSchema;
export type GetInventorySimilarResponse = SimilarInventoryResponse;
export type GetSimilarResponse = SimilarResponse;
