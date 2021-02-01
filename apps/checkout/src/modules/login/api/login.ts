import Axios from 'axios';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { VROOM_URL },
} = getConfig();

export interface User {
  username: string;
  password: string;
  userAgent: string;
  ipAddress: string;
}

export interface SuccessResponse {
  accountId: number;
  accessToken: string;
  idToken: string;
  refreshToken: string;
}

export const login = async (
  user: User
): Promise<SuccessResponse | undefined> => {
  try {
    const response = await Axios.post<SuccessResponse>(
      `${VROOM_URL}/api/auth/signin`,
      user
    );
    return response.data;
  } catch (error) {
    console.log(JSON.stringify(error));
    return undefined;
  }
};
