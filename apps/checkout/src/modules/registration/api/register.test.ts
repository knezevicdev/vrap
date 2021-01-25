import Axios from 'axios';

import {
  ErrorResponse,
  register,
  SignupRequest,
  SuccessResponse,
} from './register';
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
  const mockSignupRequest: SignupRequest = {
    username: 'mock-email',
    phone: 'mock-number',
    password: 'mock-password',
    firstName: 'mock-firstname',
    lastName: 'mock-lastname',
    optIn: true,
  };

  describe('successful registration', () => {
    const expectedResponse: SuccessResponse = {
      data: {
        accountId: 123456,
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
      },
    };

    beforeEach(() => {
      mockedAxios.post.mockResolvedValue(expectedResponse);
    });

    it('should register user', async () => {
      const actualResponse = await register(mockSignupRequest);
      expect(actualResponse).toBe(expectedResponse.data);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'some-url/api/auth/signup',
        mockSignupRequest
      );
    });
  });

  describe('error during registration', () => {
    const expectedResponse: ErrorResponse = {
      error: {
        type: 'mock-type',
        title: 'mock-title',
        details: [
          {
            message: 'mock-message',
            meta: {},
          },
        ],
        correlationId: 'mock-correlation-id',
      },
    };

    beforeEach(() => {
      mockedAxios.post.mockRejectedValue(expectedResponse);
    });

    it('should give an error', async () => {
      const actualResponse = await register(mockSignupRequest);
      expect(actualResponse).toBe(expectedResponse.error);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'some-url/api/auth/signup',
        mockSignupRequest
      );
    });
  });
});
