import axios, { AxiosResponse } from 'axios';
import qs from 'qs';

import { Shipment } from './models/Shipments';
import { User } from './models/User';

export enum Status {
  INITIAL = 'initial',
  FETCHING = 'fetching',
  SUCCESS = 'success',
  ERROR = 'error',
}

// TODO: Replace with runtime config
const SHIPPING_URL = 'http://localhost:8080';

const axiosInstance = axios.create();

export class Networker {
  getUsers(carrier?: string, status?: string): Promise<AxiosResponse<User[]>> {
    const url = `${SHIPPING_URL}/api/users?${qs.stringify(
      {
        carrier: carrier || null,
        status: status || null,
      },
      { skipNulls: true }
    )}`;

    return axiosInstance.get(url);
  }
}

export const getTenderedShipments = async (): Promise<
  AxiosResponse<Shipment[]>
> => axiosInstance.get(`${SHIPPING_URL}/api/shipments/tendered`);

export const getBookedShipments = async (): Promise<
  AxiosResponse<Shipment[]>
> => axiosInstance.get(`${SHIPPING_URL}/api/shipments/booked`);

export const getInTransitShipments = async (): Promise<
  AxiosResponse<Shipment[]>
> => axiosInstance.get(`${SHIPPING_URL}/api/shipments/in-transit`);

export const getCancelledShipments = async (): Promise<
  AxiosResponse<Shipment[]>
> => axiosInstance.get(`${SHIPPING_URL}/api/shipments/cancelled`);

export const getDeliveredShipments = async (): Promise<
  AxiosResponse<Shipment[]>
> => axiosInstance.get(`${SHIPPING_URL}/api/shipments/delivered`);
