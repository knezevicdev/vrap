import * as yup from 'yup';

export type Data = {
  BodyType: string[];
  Make: string[];
  Model: string[];
};
export const dataSchema: yup.ObjectSchema<Data> = yup
  .object({
    BodyType: yup.array(yup.string().defined()).defined(),
    Make: yup.array(yup.string().defined()).defined(),
    Model: yup.array(yup.string().defined()).defined(),
  })
  .defined();

export type GetInventorySuggestionsResponse = {
  data: Data;
};
export const getInventorySuggestionsResponseSchema: yup.ObjectSchema<GetInventorySuggestionsResponse> = yup
  .object({
    data: dataSchema,
  })
  .defined()
  .strict(true);
