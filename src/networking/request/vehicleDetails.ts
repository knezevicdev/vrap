import { GQLTypes, Response } from '@vroom-web/networking';

import GRADE_CHECK from '../../graphql/mutations/gradeCheck.graphql';
import { GradeCheckResp } from '../../interfaces.d';
import client from '../client';

export const getCarstoryVinDecode = (
  vehicleId: string,
  captchaToken: string
): Promise<any> => {
  const url = `/appraisal/api/details`;
  return client.httpRequest({
    method: 'post',
    url,
    data: { vehicleId, token: captchaToken },
  });
};

export const getCarstoryTrimFeatures = (
  trimId: number,
  captchaToken: string | null
): Promise<any> => {
  const url = `/appraisal/api/details`;
  return client.httpRequest({
    method: 'post',
    url,
    data: { vehicleId: trimId, token: captchaToken },
  });
};

export const getGradeCheck = (
  make: string,
  model: string,
  trim: string,
  miles: number,
  vin: string
): Promise<Response<GradeCheckResp>> => {
  return client.gearboxRequest<GradeCheckResp, GQLTypes.MutationGradeArgs>({
    document: GRADE_CHECK,
    variables: { make, model, trim, miles, vin },
  });
};
