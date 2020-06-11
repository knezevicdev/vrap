import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { stringify } from 'qs';

import globalEnv from '../globalEnv';
import { SearchParams } from './models/Inventory.v3';

export interface InventoryNetworking {
  postInventory(data: SearchParams): Promise<AxiosResponse>;
  getInventoryCount(): Promise<AxiosResponse>;
  getInventorySuggestionsV3(input: string): Promise<AxiosResponse>;
  getInventorySimilar(params: object): Promise<AxiosResponse>;
  postLeadsAttribution(data: object): Promise<AxiosResponse>;
}

export class Networker implements InventoryNetworking {
  private readonly axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance = axios.create()) {
    this.axiosInstance = axiosInstance;
  }

  postInventory(data: SearchParams): Promise<AxiosResponse> {
    const url = `${globalEnv.INVSEARCH_V3_URL}/inventory`;
    return this.axiosInstance.post(url, data);
  }

  getInventoryCount(): Promise<AxiosResponse> {
    const url = `${globalEnv.INVSEARCH_V3_URL}/total`;
    return this.axiosInstance.get(url);
  }

  getInventorySuggestionsV3(input: string): Promise<AxiosResponse> {
    const url = `${globalEnv.INVSEARCH_V3_URL}/suggest?input=${input}`;
    return this.axiosInstance.get(url);
  }

  getInventorySimilar(params: object): Promise<AxiosResponse> {
    const url = `${globalEnv.INVSEARCH_V3_URL}/similar?${stringify(params)}`;
    return this.axiosInstance.get(url);
  }

  postLeadsAttribution(data: object): Promise<AxiosResponse> {
    const url = `${globalEnv.LEADS_URL}/attribution`;
    return this.axiosInstance.post(url, data);
  }
}
