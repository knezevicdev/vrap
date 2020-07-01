/* eslint-disable @typescript-eslint/camelcase */
import * as yup from 'yup';
// "data": {
//  "payload": [
//    {
//        "id": 10312287,
//        "created": "2020-06-30T14:26:47.933703Z",
//        "updated": "2020-06-30T14:26:59.761477Z",
//        "vehicleVin": "1GT422C8XFF560039",
//        "status": {
//            "key": "for_sale",
//            "display": "For Sale"
//        },
//        "miles": 43397,
//        "purchasingID": 323,
//        "pricingID": null,
//        "fyusionID": "urfb4sx2maq5g",
//        "externalID": "8a2f55d8-46ad-4c37-8d5a-4933469e13ff",
//        "consignmentPartnerName": null,
//        "isListed": false,
//        "grade": null
//    }
//  ],
//  "next_page": null
//  }
// }

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
