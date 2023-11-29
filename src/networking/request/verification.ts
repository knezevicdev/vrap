import { isErrorResponse, Response } from '@vroom-web/networking';
import getConfig from 'next/config';

import LENDERS_BY_NAME from '../../graphql/queries/lendersByName.graphql';
import client from '../client';
import { CafRespData, VerificationRespData } from '../models/Price';
import { Lender, PatchReviewData } from '../models/Verification';

const { publicRuntimeConfig } = getConfig();
const VROOM_URL = publicRuntimeConfig.VROOM_URL;

export const getVerificationDetails = (
  priceId: string
): Promise<Response<VerificationRespData>> => {
  const url = `${VROOM_URL}/suyc-api/v1/acquisition/verification/form?f=${priceId}`;
  return client.httpRequest<VerificationRespData>({
    method: 'get',
    url,
  });
};

export const postVerification = (
  priceId: string
): Promise<Response<VerificationRespData>> => {
  const payload = { offer_id: priceId };
  const url = `${VROOM_URL}/suyc-api/v1/acquisition/verification/form`;
  return client.httpRequest<VerificationRespData>({
    method: 'post',
    url,
    data: {
      payload,
    },
  });
};

export const patchVerification = (
  data: PatchReviewData
): Promise<Response<VerificationRespData>> => {
  const url = `${VROOM_URL}/suyc-api/v1/acquisition/verification/form`;
  return client.httpRequest<VerificationRespData>({
    method: 'PATCH',
    url,
    data,
  });
};

export const getCaf = (): Promise<Response<CafRespData>> => {
  return client.httpRequest({
    method: 'GET',
    url: `${client.httpEndpoints.interchangeUrl}/suyc-api/v1/acquisition/verification/caf`,
  });
};

export const lendersByName = async (name: string): Promise<Lender[]> => {
  const lendersResp = await client.gearboxRequest<{
    lendersByName: { lenders: Lender[] };
  }>({
    document: LENDERS_BY_NAME,
    variables: { name },
  });
  if (isErrorResponse(lendersResp)) throw lendersResp;
  return lendersResp.data.lendersByName.lenders;
};
