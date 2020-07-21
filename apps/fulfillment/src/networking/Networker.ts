import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { DeliveryOrder } from './models/Shipment';

export enum Status {
  INITIAL = 'initial',
  FETCHING = 'fetching',
  SUCCESS = 'success',
  ERROR = 'error',
}

// TODO: Replace with runtime config
const SHIPMENT_URL = 'http://localhost:8080';

export class Networker {
  private readonly axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance = axios.create()) {
    this.axiosInstance = axiosInstance;
  }

  getDeliveryOrders(): Promise<AxiosResponse<DeliveryOrder[]>> {
    const url = `${SHIPMENT_URL}/api/shipment`;
    return this.axiosInstance.get(url);
  }
}
