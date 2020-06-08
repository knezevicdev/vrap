/* eslint-disable @typescript-eslint/camelcase */
import * as yup from 'yup';

export const dealSchema = yup
  .object({
    deal_id: yup.number(),
    account_id: yup.number(),
    vin: yup.string(),
    summary: yup.object({
      paymentType: yup.string(),
      dealStatus: yup.object({
        status: yup.string(),
        step: yup.string(),
        pastSteps: yup.array(yup.string()).nullable(),
        frozen: yup.boolean(),
        reason: yup.string(),
        errorDetail: yup.string(),
        interestedInTrade: yup.boolean(),
        canBeCancelled: yup.boolean(),
      }),
      account: yup.object({
        userName: yup.string(),
        firstName: yup.string(),
        middleName: yup.string(),
        lastName: yup.string(),
        phone: yup.string(),
      }),
      inventory: yup.object({
        id: yup.string(),
        miles: yup.number(),
        ownerCount: yup.number(),
        pricing: yup.object({
          listPrice: yup.number(),
          msrp: yup.number(),
          blueBookValue: yup.number(),
        }),
        status: yup.object({
          key: yup.string(),
          display: yup.string(),
        }),
        vehicle: yup.object({
          vin: yup.string(),
          year: yup.number(),
          make: yup.string(),
          model: yup.string(),
          trim: yup.string(),
          fuelType: yup.object({
            key: yup.string(),
            display: yup.string(),
          }),
          seatingCapacity: yup.number(),
          grossWeight: yup.number(),
          isElectric: yup.boolean(),
          exteriorColorGeneric: yup.object({
            key: yup.string(),
            display: yup.string(),
          }),
          cylinders: yup.number(),
          engineBore: yup.number(),
        }),
        imageUrls: yup.array(yup.string()).nullable(),
        leadPhotoURL: yup.string(),
      }),
    }),
  })
  .strict(true);
export type Deal = yup.InferType<typeof dealSchema>;

export const dataSchema = yup.array<Deal>(dealSchema).nullable().strict(true);
export type Data = yup.InferType<typeof dataSchema>;

export const getMyDealsResponseSchema = yup
  .object<{
    data: Data;
  }>({
    data: dataSchema,
  })
  .strict(true);
export type GetMyDealsResponse = yup.InferType<typeof getMyDealsResponseSchema>;
