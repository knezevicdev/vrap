import { InventoryResponse, inventoryResponseSchema } from './Inventory';

type SoldStatus =
  | 'all_cars'
  | 'for_sale'
  | 'sale_pending'
  | 'sold'
  | 'delivered';

export interface PostInventoryRequestData {
  offset?: number;
  fulldetails?: boolean;
  limit?: number;
  testdriveonly?: boolean;
  make?: string[];
  model?: string[];
  bodytype?: string[];
  color?: string[];
  year?: {} | { min: number; max: number };
  price?: {} | { min: number; max: number };
  miles?: {} | { min: number; max: number };
  transmissionid?: string;
  drivetype?: string[];
  sortby?: string;
  sortdirection?: string;
  searchall?: string;
  vin?: string[];
  'sold-status'?: SoldStatus;
  source?: string;
}

export const postInventoryResponseSchema = inventoryResponseSchema;
export type PostInventoryResponse = InventoryResponse;
