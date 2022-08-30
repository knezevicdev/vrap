import { GQLTypes, Response } from '@vroom-web/networking';
import getConfig from 'next/config';

import CREATE_USER_PAYMENT_ACCOUNT from '../../graphql/mutations/createUserPaymentAccount.graphql';
import GET_PLAID_TOKEN from '../../graphql/queries/getLinkToken.graphql';
import {
  MailingAddress,
  PaymentOverviewFormValues,
  PlaidData,
  PlaidTokenResp,
} from '../../interfaces.d';
import client from '../client';
import { PaymentOptionsRespData } from '../models/Price';

const { publicRuntimeConfig } = getConfig();
const VROOM_URL = publicRuntimeConfig.NEXT_PUBLIC_VROOM_URL;

export interface PaymentData {
  sf_offer_id: string;
  payment_method?: string;
  account_number?: string;
  routing_number?: string;
  payment_address?: MailingAddress;
}

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

  return await client.httpRequest<PaymentOptionsRespData>({
    method: 'post',
    url,
    data: { payload: data },
  });
};

export const getPlaidToken = async (
  userId: string
): Promise<Response<PlaidTokenResp>> => {
  return await client.gqlRequest<
    PlaidTokenResp,
    GQLTypes.QueryGetLinkTokenArgs
  >({
    document: GET_PLAID_TOKEN,
    variables: { userId, source: 'appraisal' },
  });
};

export const postPlaidPayment = async (
  input: PlaidData
): Promise<Response<PlaidTokenResp>> => {
  return await client.gqlRequest<
    PlaidTokenResp,
    GQLTypes.MutationCreateUserPaymentAccountArgs
  >({
    document: CREATE_USER_PAYMENT_ACCOUNT,
    variables: { input },
  });
};

export const getInstitutionLogo = async (id: string): Promise<any> => {
  const url = `${VROOM_URL}/mypayments/logo/${id}`;
  return await client.httpRequest({
    method: 'get',
    url,
  });
};