import { Response } from '@vroom-web/networking';
import getConfig from 'next/config';

import ACCEPT_REJECT_OFFER from '../../graphql/mutations/acceptRejectOffer.graphql';
import { AppraisalResp } from '../../interfaces.d';
import client from '../client';
import { Prices } from '../models/Price';
import { checkAppraisalPayload, getDummyOfferResp } from '../utils';

const { publicRuntimeConfig } = getConfig();
const VROOM_URL = publicRuntimeConfig.NEXT_PUBLIC_VROOM_URL;

type MutationAcceptRejectOfferArgs = {
  offerId: string;
  accepted: boolean;
  reason: string;
  reasonOther: string;
  success: boolean;
  detail: string;
  externalUserId: string;
};

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

export const acceptPriceOffer = async (
  offerId: string,
  externalUserId: string
): Promise<void> => {
  const key = 'APPRAISAL_ACCEPTED_OFFER';

  const acceptedOfferId = localStorage.getItem(key);
  if (acceptedOfferId === offerId) return;

  try {
    await client.gqlRequest<unknown, MutationAcceptRejectOfferArgs>({
      document: ACCEPT_REJECT_OFFER,
      variables: {
        offerId,
        externalUserId,
        accepted: true,
        reason: '',
        reasonOther: '',
        success: true,
        detail: '',
      },
    });
    localStorage.setItem(key, offerId);
  } catch (err) {
    console.warn('Error while submitting price response');
  }
};

export const postAppraisalReview = async (
  data: any,
  captchaToken: string
): Promise<Response<AppraisalResp>> => {
  const appraisalRequestScore = checkAppraisalPayload(data);
  const url = `/appraisal/api/appraisal`;

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
      timeout: 30000,
      data: payload,
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
