import { GQLTypes, Response } from '@vroom-web/networking';
import getConfig from 'next/config';

import ACCEPT_REJECT_OFFER from '../../graphql/mutations/acceptRejectOffer.graphql';
import { AppraisalResp } from '../../interfaces.d';
import { FingerprintResult } from '../../utils/initFingerprint';
import client from '../client';
import { Prices } from '../models/Price';
import { checkAppraisalPayload, getDummyOfferResp } from '../utils';

const { publicRuntimeConfig } = getConfig();
const VROOM_URL = publicRuntimeConfig.NEXT_PUBLIC_VROOM_URL;

export interface PriceData {
  priceId: string;
  accepted: boolean;
}

export const getOfferDetails = async (
  priceId: string
): Promise<Response<Prices>> => {
  const encodedPriceID = encodeURIComponent(priceId);
  const url = `${VROOM_URL}/suyc-api/v1/acquisition/offer?offerID=${encodedPriceID}`;
  const res = await client.httpRequest<Prices>({
    method: 'get',
    url,
  });

  return res;
};

export const submitPriceResponse = async (
  priceData: PriceData
): Promise<Response<any>> => {
  const { priceId: offerId, accepted } = priceData;
  const res = await client.gqlRequest<
    any,
    GQLTypes.MutationAcceptRejectOfferArgs
  >({
    document: ACCEPT_REJECT_OFFER,
    variables: { offerId, accepted },
  });

  return res;
};

export const postAppraisalReview = async (
  data: any,
  captchaToken: string,
  fingerprintResult: FingerprintResult
): Promise<Response<AppraisalResp>> => {
  const appraisalRequestScore = checkAppraisalPayload(data);
  const url = `${client.httpEndpoints.interchangeUrl}/appraisal/api/appraisal`;

  if (appraisalRequestScore >= 3) {
    const goodUntil = new Date();
    goodUntil.setDate(goodUntil.getDate() + 7);
    return getDummyOfferResp(data, goodUntil, new Date().toISOString());
  } else {
    const payload = {
      payload: data,
      token: captchaToken,
    };

    return await client.httpRequest({
      method: 'post',
      url,
      timeout: 10000,
      data: payload,
      params: fingerprintResult,
    });
  }
};

export const getZipCodeValidation = async (zipCode: string): Promise<any> => {
  const url = `/appraisal/api/validation/${zipCode}`;
  return await client.httpRequest({
    method: 'get',
    url,
  });
};
