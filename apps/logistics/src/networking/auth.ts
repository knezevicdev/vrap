import { AxiosResponse } from 'axios';

import { IdToken } from './models/Auth';
import { User } from './models/User';
import { axiosInstance, GEARBOX_URL } from './Networker';

export const postSignUp = async (
  username: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<AxiosResponse<User>> =>
  axiosInstance.post(`/api/signup`, {
    username,
    password,
    firstName,
    lastName,
  });

export const postSignIn = async (
  email: string,
  password: string
): Promise<AxiosResponse<IdToken>> => {
  const url = '/api/signin';
  const data = {
    email,
    password,
  };
  return axiosInstance.post(url, data);
};

export const getSignOut = async (): Promise<void> => {
  const url = '/api/signout';
  await axiosInstance.get(url);
};

export const forgotPassword = async (variables: {
  email: string;
}): Promise<AxiosResponse<void>> => {
  const data = {
    query: `
      mutation forgotPassword($email: String!) {
        forgotPassword(email: $email)
      }
    `,
    variables,
    queryKey: 'forgotPassword',
  };
  return axiosInstance.post(GEARBOX_URL, data);
};
