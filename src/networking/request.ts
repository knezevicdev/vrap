import { GQLTypes, isErrorResponse, Response } from '@vroom-web/networking';
import { ActualFileObject } from 'filepond';
import getConfig from 'next/config';

import client from './client';
import {
  CafRespData,
  PaymentOptionsRespData,
  Prices,
  Verification,
  VerificationRespData,
} from './models/Price';
import {
  checkAppraisalPayload,
  formWebLeadPayload,
  getDummyOfferResp,
} from './utils';

import ACCEPT_REJECT_OFFER from 'src/graphql/mutations/acceptRejectOffer.graphql';
import CREATE_USER_PAYMENT_ACCOUNT from 'src/graphql/mutations/createUserPaymentAccount.graphql';
import GRADE_CHECK from 'src/graphql/mutations/gradeCheck.graphql';
import GET_PLAID_TOKEN from 'src/graphql/queries/getLinkToken.graphql';
import GET_USER from 'src/graphql/queries/getUser.graphql';
import LENDERS_BY_NAME from 'src/graphql/queries/lendersByName.graphql';
import {
  AppraisalResp,
  GradeCheckResp,
  LtoVPayload,
  LtoVResp,
  MailingAddress,
  MileageCheckResp,
  PaymentOverviewFormValues,
  PlaidData,
  PlaidTokenResp,
  WebLeadsPayload,
  WebLeadUserData,
} from 'src/interfaces.d';
import {
  DocumentResponse,
  Lender,
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

export const updateVerification = async (
  payload: Partial<Verification>,
  priceId: string
): Promise<Response<VerificationRespData>> => {
  const url = `${client.httpEndpoints.interchangeUrl}/suyc-api/v1/acquisition/verification/form`;
  return client.httpRequest<VerificationRespData>({
    method: 'patch',
    url,
    data: {
      payload: {
        ...payload,
        offer_id: priceId,
      },
    },
  });
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
    data: { payload: data },
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

export const handleLicenseToVinApi = async (
  data: LtoVPayload
): Promise<Response<LtoVResp>> => {
  const url = `${VROOM_URL}/suyc-api/v1/GetVinByLicencePlate`;
  const payload = {
    payload: data,
  };

  return await client.httpRequest({
    method: 'post',
    url,
    data: payload,
  });
};

export const postAppraisalReview = async (
  data: any,
  captchaToken: string
): Promise<Response<AppraisalResp>> => {
  const appraisalRequestScore = checkAppraisalPayload(data);
  const url = `${VROOM_URL}/appraisal/api/appraisal`;

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
    });
  }
};

export const getCarstoryVinDecode = async (
  vehicleId: string,
  captchaToken: string
): Promise<any> => {
  const url = `${VROOM_URL}/appraisal/api/details`;
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

export const postEmailCapture = async (
  emailAddress: string,
  marketingId: string
): Promise<Response<any>> => {
  // need to change response type
  const searchParams = { searchall: '-' };
  const contextData = { category: 'sell' };
  const payload = { emailAddress, marketingId, searchParams, contextData };
  const url = `${VROOM_URL}/horn/v2/email-capture`;
  return await client.httpRequest({
    method: 'post',
    url,
    data: { payload },
  });
};

export const IsUserSignIn = async (): Promise<boolean> => {
  const signInStatusResp = await client.signInStatus();
  if (isErrorResponse(signInStatusResp)) throw signInStatusResp;
  return (
    signInStatusResp &&
    signInStatusResp.data &&
    signInStatusResp.data.status === 'active'
  );
};

export const getUser = async (): Promise<GQLTypes.User> => {
  const userResp = await client.gqlRequest<{ user: GQLTypes.User }>({
    document: GET_USER,
  });
  if (isErrorResponse(userResp)) throw userResp;
  return userResp.data.user;
};

export const submitWeblead = async (
  webleadUserData: WebLeadUserData
): Promise<Response<any>> => {
  const webleadPayload: WebLeadsPayload = formWebLeadPayload(webleadUserData);
  const webleadResponse = await client.httpRequest({
    method: 'POST',
    url: client.httpEndpoints.webleadsUrl,
    data: webleadPayload,
  });

  return webleadResponse;
};

export const getCaf = async (): Promise<Response<CafRespData>> => {
  return await client.httpRequest({
    method: 'GET',
    url: `${client.httpEndpoints.interchangeUrl}/suyc-api/v1/acquisition/verification/caf`,
  });
};

export const lendersByName = async (name: string): Promise<Lender[]> => {
  const lendersResp = await client.gqlRequest<{
    lendersByName: { lenders: Lender[] };
  }>({
    document: LENDERS_BY_NAME,
    variables: { name },
  });
  if (isErrorResponse(lendersResp)) throw lendersResp;
  return lendersResp.data.lendersByName.lenders;
};

interface VerificationFileUploadUrlPayload {
  file_extension: string;
  file_type: string;
  original_file_name: string;
}

interface VerificationFileUploadResponse {
  data: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    FileUploadURL: string;
    id: string;
  };
}

export const getVerificationFileUploadUrl = async (
  priceId: string,
  payload: VerificationFileUploadUrlPayload
): Promise<Response<VerificationFileUploadResponse>> => {
  return await client.httpRequest({
    method: 'POST',
    url: `${client.httpEndpoints.interchangeUrl}/suyc-api/v1/acquisition/verification/getuploadurl`,
    data: {
      correlationId: priceId,
      payload,
    },
  });
};

export const uploadVerificationFile = async (
  url: string,
  file: ActualFileObject
): Promise<Response<any>> => {
  return await client.httpRequest({
    method: 'PUT',
    url,
    data: file,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: 15000,
  });
};

export const deleteVerificationFile = async (
  fileId: string
): Promise<Response<any>> => {
  return await client.httpRequest({
    method: 'DELETE',
    url: `${VROOM_URL}/suyc-api/v1/acquisition/verification/file?fid=${fileId}`,
    data: {
      source: 'vroom.com',
      version: '1',
      timestamp: new Date().toISOString(),
      payload: {},
    },
  });
};
