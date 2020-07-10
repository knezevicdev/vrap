import axios, { AxiosInstance } from 'axios';

import {
  getInventoryAvailabilityResponseSchema,
  SoldStatus,
} from './types/GetInventoryAvailability';

export interface InventoryServiceNetworking {
  getInventoryAvailability(vin: string): Promise<boolean>;
}

export default class InventoryServiceNetworker
  implements InventoryServiceNetworking {
  private readonly axiosInstance: AxiosInstance;
  private readonly hostUrl: string;

  constructor(hostUrl: string) {
    this.axiosInstance = axios.create();
    this.hostUrl = hostUrl;
  }

  async getInventoryAvailability(vin: string): Promise<boolean> {
    const url = `${this.hostUrl}/inventory?vin=${vin}`;
    const response = await this.axiosInstance.get(url);
    await getInventoryAvailabilityResponseSchema.validate(response.data);
    const payload = response.data.data.payload;
    for (const item of payload) {
      if (item.status.key === SoldStatus.FOR_SALE) {
        return true;
      }
    }
    return false;
  }
}
