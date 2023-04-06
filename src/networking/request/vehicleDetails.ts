import { GQLTypes, Response } from '@vroom-web/networking';

import GRADE_CHECK from '../../graphql/mutations/gradeCheck.graphql';
import { GradeCheckResp, MileageCheckResp } from '../../interfaces.d';
import client from '../client';

export const getCarstoryVinDecode = async (
  vehicleId: string,
  captchaToken: string
): Promise<any> => {
  const url = `/appraisal/api/details`;
  return await client.httpRequest({
    method: 'post',
    url,
    data: { vehicleId, token: captchaToken },
  });
};

export const getCarstoryTrimFeatures = async (
  trimId: number,
  captchaToken: string | null
): Promise<any> => {
  const url = `/appraisal/api/details`;
  return await client.httpRequest({
    method: 'post',
    url,
    data: { vehicleId: trimId, token: captchaToken },
  });
};

export const getGradeCheck = async (
  make: string,
  model: string,
  trim: string,
  miles: number,
  vin: string
): Promise<Response<GradeCheckResp>> => {
  const res = await client.gqlRequest<
    GradeCheckResp,
    GQLTypes.MutationGradeArgs
  >({
    document: GRADE_CHECK,
    variables: { make, model, trim, miles, vin },
  });

  return res;
};

export const getMilageCheck = async (
  vin: string
): Promise<Response<MileageCheckResp>> => {
  const url = `${client.httpEndpoints.interchangeUrl}/suyc-api/v1/mileage/${vin}`;

  return await client.httpRequest({
    method: 'get',
    url,
  });
};
