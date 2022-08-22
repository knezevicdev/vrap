import { GQLTypes, Response } from '@vroom-web/networking';
import getConfig from 'next/config';

import GRADE_CHECK from '../../graphql/mutations/gradeCheck.graphql';
import { GradeCheckResp, MileageCheckResp } from '../../interfaces.d';
import client from '../client';

const { publicRuntimeConfig } = getConfig();
const VROOM_URL = publicRuntimeConfig.NEXT_PUBLIC_VROOM_URL;
const { NEXT_PUBLIC_INTERCHANGE_URL } = publicRuntimeConfig;

export const getCarstoryVinDecode = async (
  vehicleId: string,
  captchaToken: string
): Promise<any> => {
  const url = `${NEXT_PUBLIC_INTERCHANGE_URL}/appraisal/api/details`;
  return await client.httpRequest({
    method: 'post',
    url,
    data: { vehicleId, token: captchaToken },
  });
};

export const getCarstoryTrimFeatures = async (trimId: number): Promise<any> => {
  const url = `${VROOM_URL}/suyc-api/v1/details/${trimId}`;
  return await client.httpRequest({
    method: 'get',
    url,
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
  const url = `${VROOM_URL}/suyc-api/v1/mileage/${vin}`;

  return await client.httpRequest({
    method: 'get',
    url,
  });
};
