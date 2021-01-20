/* eslint-disable @typescript-eslint/camelcase */
import axios, { AxiosInstance } from 'axios';
import { mocked } from 'ts-jest/utils';

import EmailCaptureNetworker, {
  PostEmailCaptureRequestData,
  PostEmailCaptureResponse,
} from './EmailCaptureNetworker';

jest.mock('axios');

const mockAxios: AxiosInstance = jest.genMockFromModule('axios');

describe('postEmailCapture', () => {
  mocked(axios.create).mockImplementationOnce(() => mockAxios);
  const emailCaptureNetworker = new EmailCaptureNetworker('testUrl');
  it('axios post should be passed the correct url and POST body', () => {
    const requestBody: PostEmailCaptureRequestData = {
      payload: {
        emailAddress: 'test@vroom.com',
        marketingId: 'sdaf234r23d',
        searchParams: {
          modelSlug: ['ford'],
          searchall: 'foo bar foo',
        },
      },
    };
    const data: PostEmailCaptureResponse = {
      data: {
        success: true,
      },
    };
    mocked(mockAxios.post).mockImplementationOnce(() =>
      Promise.resolve({
        data,
      })
    );
    emailCaptureNetworker.postEmailCapture(requestBody);
    expect(mockAxios.post).toHaveBeenCalledWith(
      'testUrl/v2/email-capture',
      requestBody
    );
  });

  it('resolves responseData that matches the schema', async () => {
    const requestBody: PostEmailCaptureRequestData = {
      payload: {
        emailAddress: 'test@vroom.com',
        marketingId: 'sdaf234r23d',
        searchParams: {
          modelSlug: ['ford'],
          searchall: 'foo bar foo',
        },
      },
    };
    const data: PostEmailCaptureResponse = {
      data: {
        success: true,
      },
    };
    mocked(mockAxios.post).mockImplementationOnce(() =>
      Promise.resolve({
        data,
      })
    );
    await expect(
      emailCaptureNetworker.postEmailCapture(requestBody)
    ).resolves.toEqual(data);
  });
});
