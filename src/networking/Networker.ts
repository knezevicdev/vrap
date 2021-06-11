import axios, { AxiosInstance, AxiosResponse } from 'axios';

import {
  PaymentOptionsRespData,
  Prices,
  VerificationRespData,
} from './models/Price';

import ENVS from 'src/integrations/Envs';
import {
  MailingAddress,
  PaymentOverviewFormValues,
  PlaidData,
  PlaidTokenResp,
} from 'src/interfaces.d';

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

export class Networker {
  private readonly axiosInstance: AxiosInstance;
  private readonly gearboxUrl = ENVS.GEARBOX_URL;

  constructor(axiosInstance: AxiosInstance = axios.create()) {
    this.axiosInstance = axiosInstance;
  }

  getOfferDetails(priceId: string): Promise<AxiosResponse<Prices>> {
    const encodedPriceID = encodeURIComponent(priceId);
    const url = `${ENVS.VROOM_URL}/api/appraisal/get-offer?offerID=${encodedPriceID}`;
    return this.axiosInstance.get(url);
  }

  submitPriceResponse(priceData: PriceData): Promise<AxiosResponse> {
    const { priceId: offerId, accepted } = priceData;
    const data = {
      query: `mutation ($offerId: String!, $accepted: Boolean!) {
        acceptRejectOffer(offerId: $offerId, accepted: $accepted) {
          offerStatus
        }
      }`,
      variables: { offerId, accepted },
    };

    return this.axiosInstance.post(this.gearboxUrl, data);
  }

  getVerificationDetails(
    priceId: string
  ): Promise<AxiosResponse<VerificationRespData>> {
    const url = `${ENVS.VROOM_URL}/api/appraisal/verification?offerId=${priceId}`;
    return this.axiosInstance.get(url);
  }

  submitPaymentOptions(
    paymentData: PaymentOverviewFormValues,
    priceId: string,
    address: MailingAddress
  ): Promise<AxiosResponse<PaymentOptionsRespData>> {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const data: PaymentData = { sf_offer_id: priceId };
    const url = `${ENVS.VROOM_URL}/api/appraisal/payment`;

    if (paymentData.paymentOption === 'Direct Deposit') {
      data['payment_method'] = 'ach';
      data['account_number'] = paymentData.bankAccountNumber;
      data['routing_number'] = paymentData.routingNumber;
    } else if (paymentData.paymentOption === 'Check by Mail') {
      data['payment_method'] = 'check';
      data['payment_address'] = address;
    }

    return this.axiosInstance.post(url, data);
  }

  getPlaidToken = async (
    userId: string
  ): Promise<AxiosResponse<PlaidTokenResp>> => {
    const data = {
      query: `query ($userId: String!, $source: String) {
        getLinkToken(userId: $userId, source: $source) {
          LinkToken,
          Expiration,
          RequestId
        }
      }`,
      variables: { userId, source: 'appraisal' },
    };

    return this.axiosInstance.post(this.gearboxUrl, data);
  };

  postPlaidPayment = async (
    input: PlaidData
  ): Promise<AxiosResponse<PlaidTokenResp>> => {
    const data = {
      query: `mutation ($input: CreateUserPaymentAccountInput) {
        createUserPaymentAccount(input: $input)
      }`,
      variables: { input },
    };

    return this.axiosInstance.post(this.gearboxUrl, data);
  };
}
