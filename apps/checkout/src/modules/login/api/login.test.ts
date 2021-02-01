import Axios, { AxiosResponse } from 'axios';

import { login, SuccessResponse, User } from './login';
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

describe('User Login Test', () => {
  const mockedUser: User = {
    username: 'mock-email',
    password: 'mock-password',
    userAgent: 'mock-userAgent',
    ipAddress: 'mock-ipAddress',
  };
  const expectedUrl = 'some-url/api/auth/signin';

  describe('successful login', () => {
    const successResponse: SuccessResponse = {
      accountId: 123456,
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      idToken: 'mock-id-token',
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

    it('should login user', async () => {
      const actualResponse = await login(mockedUser);
      expect(actualResponse).toBe(successResponse);
      expect(mockedAxios.post).toHaveBeenCalledWith(expectedUrl, mockedUser);
    });
  });

  describe('error during login', () => {
    beforeEach(() => {
      mockedAxios.post.mockRejectedValue(new Error('some error'));
    });

    it('should give an error', async () => {
      const actualResponse = await login(mockedUser);
      expect(actualResponse).toBe(undefined);
      expect(mockedAxios.post).toHaveBeenCalledWith(expectedUrl, mockedUser);
    });
  });
});
