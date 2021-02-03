import axios, { AxiosError } from 'axios';
import Cookie from 'js-cookie';

import { IdToken } from './models/Auth';
export * from './auth';
export * from './shipments';
export * from './user';

export const GEARBOX_URL = '/api/gearbox';

export enum Status {
  INITIAL = 'initial',
  FETCHING = 'fetching',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err: AxiosError) => {
    const authDataCookie: IdToken | undefined = Cookie.getJSON('authData');
    if (err.response?.status === 401 || authDataCookie === undefined) {
      if (err.response?.headers.location) {
        const redirectUrl =
          err.response.headers.location === window.location.pathname
            ? ''
            : `${err.response.headers.location}?previous=${window.location.pathname}`;
        window.location.assign(redirectUrl);
      } else {
        window.history.back();
      }
    }
    return Promise.reject(err);
  }
);
