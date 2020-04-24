import * as yup from 'yup';

export const getInventoryCountResponseSchema = yup
  .object({
    data: yup.number(),
  })
  .strict(true);
export type GetInventoryCountResponse = yup.InferType<
  typeof getInventoryCountResponseSchema
>;
