import * as yup from 'yup';

export type GetInventoryCountResponse = {
  data: number;
};
export const getInventoryCountResponseSchema: yup.ObjectSchema<GetInventoryCountResponse> = yup
  .object({
    data: yup.number().defined(),
  })
  .defined()
  .strict(true);
