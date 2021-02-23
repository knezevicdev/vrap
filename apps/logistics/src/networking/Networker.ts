import axios, { AxiosError } from 'axios';

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
    if (err.response?.status === 401) {
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
    const e = err.response?.data.error;
    if (e && e.details[0].message) {
      return Promise.reject(new Error(e.details[0].message));
    }
    return Promise.reject(err);
  }
);
