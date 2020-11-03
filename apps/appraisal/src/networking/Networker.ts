import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { Prices } from './models/Price';

import ENVS from 'src/integrations/Envs';

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
    console.log('fetching priceId');
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
}
