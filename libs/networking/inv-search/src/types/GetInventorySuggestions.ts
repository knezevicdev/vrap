import * as yup from 'yup';

export const dataSchema = yup
  .object({
    BodyType: yup.array(yup.string()),
    Make: yup.array(yup.string()),
    Model: yup.array(yup.string()),
  })
  .strict(true);
export type Data = yup.InferType<typeof dataSchema>;

export const getInventorySuggestionsResponseSchema = yup
  .object<{
    data: Data;
  }>({
    data: dataSchema,
  })
  .strict(true);
export type GetInventorySuggestionsResponse = yup.InferType<
  typeof getInventorySuggestionsResponseSchema
>;
