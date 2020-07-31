import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { Details, Summary } from './models/DeliveryOrder';

export enum Status {
  INITIAL = 'initial',
  FETCHING = 'fetching',
  SUCCESS = 'success',
  ERROR = 'error',
}

// TODO: Replace with runtime config
const SHIPPING_URL = 'http://localhost:8080';

export class Networker {
  private readonly axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance = axios.create()) {
    this.axiosInstance = axiosInstance;
  }

  getDeliveryOrders(): Promise<AxiosResponse<Summary[]>> {
    const url = `${SHIPPING_URL}/api/delivery-order`;
    return this.axiosInstance.get(url);
  }

  getDeliveryOrder(vin: string): Promise<AxiosResponse<Details>> {
    const url = `${SHIPPING_URL}/api/delivery-order/${vin}`;
    return this.axiosInstance.get(url);
  }
}
