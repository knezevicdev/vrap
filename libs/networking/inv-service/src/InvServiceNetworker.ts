import axios, { AxiosInstance } from 'axios';

import {
  GetInventoryAvailabilityResponse,
  getInventoryAvailabilityResponseSchema,
} from './types/GetInventoryAvailability';

export interface InventoryServiceNetworking {
  getInventoryAvailability(
    vin: string
  ): Promise<GetInventoryAvailabilityResponse>;
}

export default class InventoryServiceNetworker
  implements InventoryServiceNetworking {
  private readonly axiosInstance: AxiosInstance;
  private readonly hostUrl: string;

  constructor(hostUrl: string) {
    this.axiosInstance = axios.create();
    this.hostUrl = hostUrl;
  }

  async getInventoryAvailability(
    vin: string
  ): Promise<GetInventoryAvailabilityResponse> {
    const url = `${this.hostUrl}/inventory?vin=${vin}`;
    const response = await this.axiosInstance.get(url);
    await getInventoryAvailabilityResponseSchema.validate(response.data);
    return response.data as GetInventoryAvailabilityResponse;
  }
}
