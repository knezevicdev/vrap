import { isErrorResponse, Response } from '@vroom-web/networking';
import { enc, HmacSHA256 } from 'crypto-js';
import getConfig from 'next/config';

import ACCEPT_REJECT_OFFER from '../../graphql/mutations/acceptRejectOffer.graphql';
import { AppraisalResp } from '../../interfaces.d';
import client from '../client';
import { Prices } from '../models/Price';
import { checkAppraisalPayload, getDummyOfferResp } from '../utils';
import { getUser } from './user';

const { publicRuntimeConfig } = getConfig();
const VROOM_URL = publicRuntimeConfig.VROOM_URL;

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
  const response = await client.httpRequest<Prices>({
    method: 'get',
    url,
  });

  if (isErrorResponse(response) || typeof localStorage === 'undefined')
    return response;

  if (response.data.data.length === 0) {
    localStorage.removeItem(`appraisal-reject-reasons-${priceId}`);
  } else {
    const rejectReasons = localStorage.getItem(
      `appraisal-reject-reasons-${priceId}`
    );

    if (rejectReasons)
      try {
        response.data.data[0].price_reduction_reasons =
          JSON.parse(rejectReasons);
      } catch {
        console.warn('Error while parsing reject reasons');
      }
  }

  return response;
};

export const acceptPriceOffer = async (offerId: string): Promise<void> => {
  const key = 'APPRAISAL_ACCEPTED_OFFER';

  const acceptedOfferId = localStorage.getItem(key);
  if (acceptedOfferId === offerId) return;

  try {
    const user = await getUser();

    await client.gearboxRequest<unknown, MutationAcceptRejectOfferArgs>({
      document: ACCEPT_REJECT_OFFER,
      variables: {
        offerId,
        externalUserId: user.externalUserID,
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
  captchaToken: string,
  signatureSecret: string
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

    const hmac = HmacSHA256(JSON.stringify(payload), signatureSecret);
    const signature = hmac.toString(enc.Hex);

    const response = await client.httpRequest<AppraisalResp>({
      method: 'post',
      url,
      timeout: 30000,
      data: payload,
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'X-Signature': signature,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'X-Token': signatureSecret,
      },
    });

    if (isErrorResponse(response)) return response;

    if (response.data.data.price_reduction_reasons) {
      localStorage.setItem(
        `appraisal-reject-reasons-${response.data.data.ID}`,
        JSON.stringify(response.data.data.price_reduction_reasons)
      );
    }

    return response;
  }
};
