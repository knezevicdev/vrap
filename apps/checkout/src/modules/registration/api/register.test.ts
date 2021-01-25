import Axios, { AxiosResponse } from 'axios';

import { register, User, SuccessResponse } from './register';
jest.mock('axios');
const mockedAxios = Axios as jest.Mocked<typeof Axios>;

jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {
        VROOM_URL: 'some-url',
      },
    };
  };
});

describe('Register User Test', () => {
  const mockedUser: User = {
    username: 'mock-email',
    phone: 'mock-number',
    password: 'mock-password',
    firstName: 'mock-firstname',
    lastName: 'mock-lastname',
    optIn: true,
  };

  describe('successful registration', () => {
    const successResponse: SuccessResponse = {
      accountId: 123456,
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
    };

    const axiosResponse: AxiosResponse = {
      data: successResponse,
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    beforeEach(() => {
      mockedAxios.post.mockResolvedValue(axiosResponse);
    });

    it('should register user', async () => {
      const actualResponse = await register(mockedUser);
      expect(actualResponse).toBe(successResponse);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'some-url/api/auth/signup',
        mockedUser
      );
    });
  });

  describe('error during registration', () => {
    beforeEach(() => {
      mockedAxios.post.mockRejectedValue(new Error('some error'));
    });

    it('should give an error', async () => {
      const actualResponse = await register(mockedUser);
      expect(actualResponse).toBe(undefined);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'some-url/api/auth/signup',
        mockedUser
      );
    });
  });
});
