/* eslint-disable @typescript-eslint/camelcase */
import * as yup from 'yup';

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

export type Inventory = {
  payload: Vehicle[];
  next_page: string | null;
};

export const inventorySchema: yup.ObjectSchema<Inventory> = yup
  .object({
    payload: yup
      .array(
        yup
          .object({
            id: yup.number().defined(),
            created: yup.string().defined(),
            updated: yup.string().defined(),
            vehicleVin: yup.string().defined(),
            status: yup
              .object({
                key: yup.string().defined(),
                display: yup.string().defined(),
              })
              .defined(),
            miles: yup.number().defined(),
            purchasingID: yup.number().defined(),
            pricingID: yup.number().defined().nullable(),
            fyusionID: yup.string().defined(),
            externalID: yup.string().defined(),
            consignmentPartnerName: yup.string().defined().nullable(),
            isListed: yup.boolean().defined(),
            grade: yup.string().defined().nullable(),
          })
          .defined()
      )
      .defined(),
    next_page: yup.string().defined().nullable(),
  })
  .defined();

export type GetInventoryAvailabilityResponse = {
  data: Inventory;
};

export const getInventoryAvailabilityResponseSchema: yup.ObjectSchema<GetInventoryAvailabilityResponse> = yup
  .object({
    data: inventorySchema,
  })
  .defined()
  .strict(true);
