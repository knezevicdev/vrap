import Axios from 'axios';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { VROOM_URL },
} = getConfig();

export interface SignupRequest {
  username: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  optIn: boolean;
  optInSms?: boolean;
  userAgent?: string;
  ipAddress?: string;
}

interface Data {
  accountId: number;
  accessToken: string;
  refreshToken: string;
}

interface Details {
  message: string;
  meta: unknown;
}

interface Error {
  type: string;
  title: string;
  details: Details[];
  correlationId: string;
}

export interface SuccessResponse {
  data: Data;
}

export interface ErrorResponse {
  error: Error;
}

export const register = (
  request: SignupRequest
): Promise<SuccessResponse | ErrorResponse> => {
  return Axios.post(`${VROOM_URL}/api/auth/signup`, request)
    .then((response) => response.data)
    .catch((error) => error.error);
};
