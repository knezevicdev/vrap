import { InventoryResponse, inventoryResponseSchema } from './Inventory';

export interface GetInventorySimilarRequestData {
  min: number;
  vin: string;
}

export const getInventorySimilarResponseSchema = inventoryResponseSchema;
export type GetInventorySimilarResponse = InventoryResponse;
