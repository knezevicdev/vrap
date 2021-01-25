import Axios from 'axios';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { VROOM_URL },
} = getConfig();

export interface User {
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

export interface SuccessResponse {
  accountId: number;
  accessToken: string;
  refreshToken: string;
}

export const register = async (
  newUser: User
): Promise<SuccessResponse | undefined> => {
  try {
    const response = await Axios.post<SuccessResponse>(
      `${VROOM_URL}/api/auth/signup`,
      newUser
    );
    return response.data;
  } catch (error) {
    console.log(JSON.stringify(error));
    return undefined;
  }
};
