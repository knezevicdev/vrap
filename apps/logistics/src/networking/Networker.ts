import axios, { AxiosResponse } from 'axios';
import qs from 'qs';

import { Shipment } from './models/Shipments';
import { Carrier, User } from './models/User';

export enum Status {
  INITIAL = 'initial',
  FETCHING = 'fetching',
  SUCCESS = 'success',
  ERROR = 'error',
}

const BASE_URL = process.env.BASE_URL;

const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getUsers = async (
  carrierCode?: string,
  status?: string
): Promise<AxiosResponse<User[]>> => {
  const url = `/api/users?${qs.stringify(
    {
      carrier: carrierCode || null,
      status: status || null,
    },
    { skipNulls: true }
  )}`;

  return axiosInstance.get(url);
};

export const getCarriers = async (
  filter: string
): Promise<AxiosResponse<Carrier[]>> => {
  const url = `/api/carriers?${qs.stringify(
    {
      filter: filter || null,
    },
    { skipNulls: true }
  )}`;

  return axiosInstance.get(url);
};

export const getUserStatuses = async (): Promise<AxiosResponse<string[]>> => {
  const url = `/api/userStatus`;
  return axiosInstance.get(url);
};

export const patchUser = async (
  id: number,
  status?: string,
  carrierCode?: string
): Promise<AxiosResponse<User>> => {
  const url = `/api/users`;
  return axiosInstance.patch(url, { id, status, carrierCode });
};

export const getTenderedShipments = async (): Promise<
  AxiosResponse<Shipment[]>
> => axiosInstance.get(`/api/shipments/tendered`);

export const getBookedShipments = async (): Promise<
  AxiosResponse<Shipment[]>
> => axiosInstance.get(`/api/shipments/booked`);

export const getInTransitShipments = async (): Promise<
  AxiosResponse<Shipment[]>
> => axiosInstance.get(`/api/shipments/in-transit`);

export const getCancelledShipments = async (): Promise<
  AxiosResponse<Shipment[]>
> => axiosInstance.get(`/api/shipments/cancelled`);

export const getDeliveredShipments = async (): Promise<
  AxiosResponse<Shipment[]>
> => axiosInstance.get(`/api/shipments/delivered`);
