/* eslint-disable @typescript-eslint/no-var-requires */
import axios, { AxiosInstance } from 'axios';
import { stringify } from 'qs';
const NodeCache = require('node-cache');
const cache = new NodeCache();

import {
  GetInventoryCountResponse,
  getInventoryCountResponseSchema,
} from './types/GetInventoryCount';
import {
  GetInventorySimilarRequestData,
  GetInventorySimilarResponse,
  getInventorySimilarResponseSchema,
  GetSimilarResponse,
} from './types/GetInventorySimilar';
import {
  GetInventorySuggestionsResponse,
  getInventorySuggestionsResponseSchema,
} from './types/GetInventorySuggestions';
import {
  PostInventoryRequestData,
  PostInventoryResponse,
  postInventoryResponseSchema,
} from './types/PostInventory';

export interface InvSearchNetworking {
  getInventoryCount(): Promise<GetInventoryCountResponse>;
  getInventorySimilar(
    data: GetInventorySimilarRequestData
  ): Promise<GetInventorySimilarResponse>;
  getInventorySuggestions(
    input: string
  ): Promise<GetInventorySuggestionsResponse>;
  postInventory(data: PostInventoryRequestData): Promise<PostInventoryResponse>;
}

export default class InvSearchNetworker implements InvSearchNetworking {
  private timeout = 3000;
  private cacheTimeInSeconds = 3600;
  private readonly axiosInstance: AxiosInstance;
  private readonly hostUrl: string;

  constructor(hostUrl: string) {
    this.axiosInstance = axios.create();
    this.hostUrl = hostUrl;
  }

  async getInventoryCount(): Promise<GetInventoryCountResponse> {
    const url = `${this.hostUrl}/total`;
    const response = await this.axiosInstance.get(url);
    await getInventoryCountResponseSchema.validate(response.data);
    return response.data as GetInventoryCountResponse;
  }

  async getInventorySimilar(
    data: GetInventorySimilarRequestData
  ): Promise<GetSimilarResponse> {
    const url = `${this.hostUrl}/similar?${stringify(data)}`;
    const response = await this.axiosInstance.get<GetInventorySimilarResponse>(
      url
    );
    const count = response.headers['x-vcf'] ? response.headers['x-vcf'] : 0;
    await getInventorySimilarResponseSchema.validate(response.data);
    return {
      data: response.data.data,
      clusterCount: count,
    } as GetSimilarResponse;
  }

  async getInventorySuggestions(
    input: string
  ): Promise<GetInventorySuggestionsResponse> {
    const url = `${this.hostUrl}/suggest?input=${input}`;
    const response = await this.axiosInstance.get(url);
    await getInventorySuggestionsResponseSchema.validate(response.data);
    return response.data as GetInventorySuggestionsResponse;
  }

  async postInventory(
    data: PostInventoryRequestData
  ): Promise<PostInventoryResponse> {
    const isServer = typeof window === 'undefined';
    const url = `${this.hostUrl}/inventory`;
    const request = JSON.stringify({
      url: url,
      data: data,
    });
    const requestCached = cache.get(request);

    if (isServer && requestCached) {
      return requestCached;
    } else {
      const response = await this.axiosInstance.post(url, data, {
        timeout: this.timeout,
      });
      await postInventoryResponseSchema.validate(response.data);
      if (isServer) {
        cache.set(request, response.data, this.cacheTimeInSeconds);
      }
      return response.data as PostInventoryResponse;
    }
  }
}
