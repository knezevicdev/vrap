import { GQLTypes, Response } from '@vroom-web/networking';
import getConfig from 'next/config';

import client from './client';
import {
  PaymentOptionsRespData,
  Prices,
  VerificationRespData,
} from './models/Price';

import ACCEPT_REJECT_OFFER from 'src/graphql/mutations/acceptRejectOffer.graphql';
import CREATE_USER_PAYMENT_ACCOUNT from 'src/graphql/mutations/createUserPaymentAccount.graphql';
import GET_PLAID_TOKEN from 'src/graphql/queries/getLinkToken.graphql';
import {
  MailingAddress,
  PaymentOverviewFormValues,
  PlaidData,
  PlaidTokenResp,
} from 'src/interfaces.d';
import {
  DocumentResponse,
  PatchReviewData,
} from 'src/networking/models/Verification';

const { publicRuntimeConfig } = getConfig();
const VROOM_URL = publicRuntimeConfig.NEXT_PUBLIC_VROOM_URL;

export enum Status {
  INITIAL = 'initial',
  FETCHING = 'fetching',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PriceData {
  priceId: string;
  accepted: boolean;
}

export interface PaymentData {
  sf_offer_id: string;
  payment_method?: string;
  account_number?: string;
  routing_number?: string;
  payment_address?: MailingAddress;
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

export const getVerificationDetails = async (
  priceId: string
): Promise<Response<VerificationRespData>> => {
  const url = `${VROOM_URL}/suyc-api/v1/acquisition/verification/form?f=${priceId}`;
  const res = await client.httpRequest<VerificationRespData>({
    method: 'get',
    url,
  });

  return res;
};

export const submitPaymentOptionSelected = async (
  paymentData: PaymentOverviewFormValues,
  priceId: string,
  address: MailingAddress
): Promise<Response<PaymentOptionsRespData>> => {
  const data: PaymentData = { sf_offer_id: priceId };
  const url = `${VROOM_URL}/suyc-api/v1/acquisition/payment`;

  if (paymentData.paymentOption === 'Direct Deposit') {
    data['payment_method'] = 'ach';
    data['account_number'] = paymentData.bankAccountNumber;
    data['routing_number'] = paymentData.routingNumber;
  } else if (paymentData.paymentOption === 'Check by Mail') {
    data['payment_method'] = 'check';
    data['payment_address'] = address;
  }

  const res = await client.httpRequest<PaymentOptionsRespData>({
    method: 'post',
    url,
    data,
  });

  return res;
};

export const getPlaidToken = async (
  userId: string
): Promise<Response<PlaidTokenResp>> => {
  const res = await client.gqlRequest<
    PlaidTokenResp,
    GQLTypes.QueryGetLinkTokenArgs
  >({
    document: GET_PLAID_TOKEN,
    variables: { userId, source: 'appraisal' },
  });

  return res;
};

export const postPlaidPayment = async (
  input: PlaidData
): Promise<Response<PlaidTokenResp>> => {
  const res = await client.gqlRequest<
    PlaidTokenResp,
    GQLTypes.MutationCreateUserPaymentAccountArgs
  >({
    document: CREATE_USER_PAYMENT_ACCOUNT,
    variables: { input },
  });

  return res;
};

export const patchVerification = async (
  data: PatchReviewData
): Promise<Response<VerificationRespData>> => {
  const url = `${VROOM_URL}/suyc-api/v1/acquisition/verification/form`;
  const res = await client.httpRequest<VerificationRespData>({
    method: 'PATCH',
    url,
    data,
  });
  return res;
};

export const getDownloadUrl = async (
  fileId: string | null,
  offerId: string
): Promise<Response<DocumentResponse>> => {
  const url = `${VROOM_URL}/suyc-api/v1/acquisition/verification/getdownloadurl?file=true&fid=${fileId}&offerId=${offerId}`;
  return await client.httpRequest({
    method: 'get',
    url,
  });
};

export const getInstitutionLogo = async (id: string): Promise<any> => {
  const url = `${VROOM_URL}/mypayments/logo/${id}`;
  return await client.httpRequest({
    method: 'get',
    url,
  });
};
