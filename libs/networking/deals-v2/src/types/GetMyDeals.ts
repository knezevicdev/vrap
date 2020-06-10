/* eslint-disable @typescript-eslint/camelcase */
import * as yup from 'yup';

export type Deal = {
  summary: {
    dealStatus: {
      status: string;
      step: string;
    };
    inventory: {
      pricing: {
        listPrice: number;
      };
      vehicle: {
        year: number;
        make: string;
        model: string;
        trim: string;
      };
    };
  };
};

export const dealSchema: yup.ObjectSchema<Deal> = yup
  .object({
    summary: yup
      .object({
        dealStatus: yup
          .object({
            status: yup.string().defined(),
            step: yup.string().defined(),
          })
          .defined(),
        inventory: yup
          .object({
            pricing: yup
              .object({
                listPrice: yup.number().defined(),
              })
              .defined(),
            vehicle: yup
              .object({
                year: yup.number().defined(),
                make: yup.string().defined(),
                model: yup.string().defined(),
                trim: yup.string().defined(),
              })
              .defined(),
          })
          .defined(),
      })
      .defined(),
  })
  .defined();

export type Data = Deal[] | null;
export const dataSchema: yup.NullableArraySchema<Deal> = yup
  .array(dealSchema)
  .defined()
  .nullable();

export type GetMyDealsResponse = {
  data: Data;
};
export const getMyDealsResponseSchema: yup.ObjectSchema<GetMyDealsResponse> = yup
  .object({
    data: dataSchema,
  })
  .defined()
  .strict(true);
