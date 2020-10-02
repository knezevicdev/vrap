import axios, { AxiosInstance, AxiosResponse } from 'axios';
import getConfig from 'next/config';

import { PriceResponse } from './models/Price';

const { publicRuntimeConfig } = getConfig();

export enum Status {
  INITIAL = 'initial',
  FETCHING = 'fetching',
  SUCCESS = 'success',
  ERROR = 'error',
}

export class Networker {
  private readonly axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance = axios.create()) {
    this.axiosInstance = axiosInstance;
  }

  getOfferDetails(priceId: string): Promise<AxiosResponse<PriceResponse>> {
    const url = `${publicRuntimeConfig.ACQUISITIONS_URL}/acquisition/offer?offerID=${priceId}`;
    console.log({ url });
    return this.axiosInstance.get(url);
  }
}
