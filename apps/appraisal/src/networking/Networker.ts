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
  PlaidTokenResp,
  PlaidData
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

  constructor(axiosInstance: AxiosInstance = axios.create()) {
    this.axiosInstance = axiosInstance;
  }

  getOfferDetails(priceId: string): Promise<AxiosResponse<Prices>> {
    const encodedPriceID = encodeURIComponent(priceId);
    const url = `${ENVS.VROOM_URL}/api/appraisal/get-offer?offerID=${encodedPriceID}`;
    return this.axiosInstance.get(url);
  }

  submitPriceResponse(priceData: PriceData): Promise<AxiosResponse<Prices>> {
    const url = `${ENVS.VROOM_URL}/api/sf/offer`;
    const { priceId: offerId, accepted } = priceData;

    const data = {
      offerId,
      accepted,
    };

    return this.axiosInstance.post(url, data);
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
    const gearboxUrl = ENVS.GEARBOX_URL + 'query';
    const authToken = btoa(`acquisitions:${ENVS.APIUSERS_ACQUISITIONS_PASSWORD}`);
    const data = {
      query: `query ($userId: String!) {
        getLinkToken(userId: $userId) {
          LinkToken,
          Expiration,
          RequestId
        }
      }`,
      variables: { userId }
    };
  
    return this.axiosInstance.post(gearboxUrl, data, {
      headers: {
        'Authorization': `Basic ${authToken}`
      }
    });
  };

  postPlaidPayment = async (
    input: PlaidData
  ): Promise<AxiosResponse<PlaidTokenResp>> => {
    const gearboxUrl = ENVS.GEARBOX_URL;
    const authToken = btoa(`acquisitions:${ENVS.APIUSERS_ACQUISITIONS_PASSWORD}`);
    const data = {
      query: `mutation ($input: CreateUserPaymentAccountInput) {
        createUserPaymentAccount(input: $input)
      }`,
      variables: { input }
    };
  
    return this.axiosInstance.post(gearboxUrl, data, {
      headers: {
        'Authorization': `Basic ${authToken}`
      }
    });
  };
}
