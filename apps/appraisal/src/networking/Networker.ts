import axios, { AxiosInstance, AxiosResponse } from 'axios';
import getConfig from 'next/config';

import { Prices } from './models/Price';

const { publicRuntimeConfig } = getConfig();

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
    const url = `${publicRuntimeConfig.ACQUISITIONS_URL}/acquisition/offer?offerID=${priceId}`;
    return this.axiosInstance.get(url);
  }

  submitPriceResponse(data: PriceData): Promise<AxiosResponse<Prices>> {
    const url = `${publicRuntimeConfig.ACQUISITIONS_URL}/acquisition/offer/reject`;
    return this.axiosInstance.post(url, data);
  }
}
