import axios, { AxiosInstance, AxiosResponse } from 'axios';

import globalEnv from '../globalEnv';

export interface InventoryNetworking {
  getInventorySuggestionsV3(input: string): Promise<AxiosResponse>;
}

export class Networker implements InventoryNetworking {
  private readonly axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance = axios.create()) {
    this.axiosInstance = axiosInstance;
  }

  getInventorySuggestionsV3(input: string): Promise<AxiosResponse> {
    const url = `${globalEnv.INVSEARCH_V3_URL}/suggest?input=${input}`;
    return this.axiosInstance.get(url);
  }
}
