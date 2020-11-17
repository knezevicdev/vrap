import axios, { AxiosInstance, AxiosResponse } from 'axios';

import {
  PaymentOptionsRespData,
  Prices,
  VerificationRespData,
} from './models/Price';

import ENVS from 'src/integrations/Envs';
import { PaymentOverviewFormValues } from 'src/interfaces.d';

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
    priceId: string
  ): Promise<AxiosResponse<PaymentOptionsRespData>> {
    const url = `${ENVS.VROOM_URL}/api/appraisal/payment`;
    let paymentMethod = '';
    if (paymentData.paymentOption === 'Direct Deposit') {
      paymentMethod = 'ach';
    } else if (paymentData.paymentOption === 'Check by Mail') {
      paymentMethod = 'check';
    }

    /* eslint-disable */
    const data = {
      payment_method: paymentMethod,
      sf_offer_id: priceId,
      account_number: paymentData.bankAccountNumber,
      routing_number: paymentData.routingNumber,
    };
    /* eslint-enable */

    return this.axiosInstance.post(url, data);
  }
}
