import axios, { AxiosInstance } from 'axios';

import {
  GetMyDealsResponse,
  getMyDealsResponseSchema,
} from './types/GetMyDeals';

export interface DealsV2Networking {
  getMyDeals(accessToken: string): Promise<GetMyDealsResponse>;
}

export default class DealsV2Networker implements DealsV2Networking {
  private readonly axiosInstance: AxiosInstance;
  private readonly hostUrl: string;

  constructor(hostUrl: string) {
    this.axiosInstance = axios.create();
    this.hostUrl = hostUrl;
  }

  async getMyDeals(accessToken: string): Promise<GetMyDealsResponse> {
    const url = `${this.hostUrl}/my-deals`;
    const response = await this.axiosInstance.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    await getMyDealsResponseSchema.validate(response.data);
    return response.data as GetMyDealsResponse;
  }
}
