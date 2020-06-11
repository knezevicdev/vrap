/* eslint-disable @typescript-eslint/camelcase */
import * as yup from 'yup';

export type Deal = {
  dealSummary: {
    dealStatus: {
      status: string;
      step: string;
    };
    inventory: {
      pricing: {
        listPrice: number;
      };
      vehicle: {
        make: string;
        model: string;
        trim: string;
        vin: string;
        year: number;
      };
    };
  };
};

export const dealSchema: yup.ObjectSchema<Deal> = yup
  .object({
    dealSummary: yup
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
                make: yup.string().defined(),
                model: yup.string().defined(),
                trim: yup.string().defined(),
                vin: yup.string().defined(),
                year: yup.number().defined(),
              })
              .defined(),
          })
          .defined(),
      })
      .defined(),
  })
  .defined();

export type User = {
  deals: Deal[];
};
export const userSchema: yup.ObjectSchema<User> = yup
  .object({
    deals: yup.array(dealSchema).defined(),
  })
  .defined();

export type Data = {
  user: User;
};
export const dataSchema: yup.ObjectSchema<Data> = yup
  .object({
    user: userSchema,
  })
  .defined();

export type GetMyDealsResponse = {
  data: Data;
};
export const getMyDealsResponseSchema: yup.ObjectSchema<GetMyDealsResponse> = yup
  .object({
    data: dataSchema,
  })
  .defined()
  .strict(true);
