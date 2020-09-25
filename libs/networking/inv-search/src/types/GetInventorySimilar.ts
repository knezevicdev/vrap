import { InventoryResponse, inventoryResponseSchema } from './Inventory';

export interface GetInventorySimilarRequestData {
  min: number;
  vin: string;
  useVinCluster: boolean;
}

export const getInventorySimilarResponseSchema = inventoryResponseSchema;
export type GetInventorySimilarResponse = InventoryResponse;
