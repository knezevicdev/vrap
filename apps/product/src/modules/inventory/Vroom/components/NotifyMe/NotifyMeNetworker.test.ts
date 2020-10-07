import axios, { AxiosInstance } from 'axios';
import { mocked } from 'ts-jest/utils';

import NotifyMeNetworker, {
  ListSubscriptionResponse,
  GearboxRequest,
  CreateDeviceResponse,
  CreateSubscriptionResponse,
} from './NotifyMeNetworker';

jest.mock('axios');
const mockAxios: AxiosInstance = jest.genMockFromModule('axios');
const VIN = 'some-vin';
const ACCESS_TOKEN = 'access-token';
const BASE_URL = 'fake-url';

describe('NotifyMe Networker', () => {
  it('should list subscription', async () => {
    mocked(axios.create).mockImplementationOnce(() => mockAxios);
    const notifyMeNetworker: NotifyMeNetworker = new NotifyMeNetworker(
      BASE_URL
    );
    const expected: ListSubscriptionResponse = {
      data: {
        data: {
          hornListSubscriptions: {
            subscriptions: [
              {
                filters: '',
                id: '',
                subject: {
                  path: '',
                  name: '',
                },
                __typename: '',
              },
            ],
            nextpage: '',
          },
        },
      },
    };
    mocked(mockAxios.post).mockResolvedValueOnce(expected.data);

    const actual: ListSubscriptionResponse = await notifyMeNetworker.listSubscription(
      ACCESS_TOKEN
    );

    expect(actual).toEqual(expected.data);
    const checkSubscriptionQuery = `
      {
        hornListSubscriptions {
          subscriptions {
            subject {
              path
              name
            }
            id
            filters
          }
          nextPage
        }
      }
    `.trim();
    const data = { query: checkSubscriptionQuery };
    const options = {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    };
    expect(mockAxios.post).toHaveBeenCalledWith(BASE_URL, data, options);
  });

  it('should register email', async () => {
    mocked(axios.create).mockImplementationOnce(() => mockAxios);
    const notifyMeNetworker: NotifyMeNetworker = new NotifyMeNetworker(
      BASE_URL
    );

    const expected: CreateDeviceResponse = {
      data: {
        hornCreateDevice: {
          __typename: 'Device',
          id: '',
          type: '',
        },
      },
    };
    mocked(mockAxios.post).mockResolvedValueOnce(expected.data);

    await notifyMeNetworker.registerEmail(ACCESS_TOKEN);

    const options = {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    };
    const variables = {
      id: '',
      type: 'EMAIL',
      applicationName: 'vroom-web',
    };
    const notifyMeRegisterQuery = `
    mutation createDevice($id: String!, $type: DeviceType!, $applicationName: String!) {
      hornCreateDevice(id: $id, type: $type, applicationName: $applicationName) {
        ... on Device {
          __typename
          id
          type
        }
        ... on ValidationError {
          __typename
          title
          details {
            message
            path
            property
          }
        }
      }
    }
  `.trim();
    const data: GearboxRequest = {
      query: notifyMeRegisterQuery,
      variables,
      operationName: 'createDevice',
    };
    expect(mockAxios.post).toHaveBeenCalledWith(BASE_URL, data, options);
  });

  it('should create subscription', async () => {
    mocked(axios.create).mockImplementationOnce(() => mockAxios);
    const notifyMeNetworker: NotifyMeNetworker = new NotifyMeNetworker(
      BASE_URL
    );
    const createSubResponse: CreateSubscriptionResponse = {
      data: {
        hornCreateSubscription: {
          filters: '',
          id: '',
          subject: {
            path: '',
            name: '',
          },
          __typename: 'SubjectSubscription',
        },
      },
    };
    const expected = {
      data: createSubResponse,
    };
    mocked(mockAxios.post).mockResolvedValueOnce(expected);

    const actual = await notifyMeNetworker.createSubscription(
      VIN,
      ACCESS_TOKEN
    );

    expect(actual).toEqual(expected.data);
    const options = {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    };
    const variables = {
      filters: `{ "vin":"${VIN}" }`,
      subject: 'inventory/available-now',
    };
    const notifyMeQuery = `
    mutation createSub($subject: String!, $filters: String!) {  hornCreateSubscription(subject: $subject, filters: $filters) {
      ... on SubjectSubscription {
        __typename
        subject {        
          path
          name
        }
        id
        filters
      }
      ... on DuplicateSubscriptionError {
        __typename
        message
      }
      ... on ValidationError {
        __typename
        title
        details {
          message
          path
          property
        }
      }
    }
  }`.trim();
    const data: GearboxRequest = {
      query: notifyMeQuery,
      variables,
      operationName: 'createSub',
    };
    expect(mockAxios.post).toHaveBeenCalledWith(BASE_URL, data, options);
  });

  it('should create subscription - Duplicate', async () => {
    mocked(axios.create).mockImplementationOnce(() => mockAxios);
    const notifyMeNetworker: NotifyMeNetworker = new NotifyMeNetworker(
      BASE_URL
    );
    const expected = {
      data: {
        data: {
          hornCreateSubscription: {
            filters: '',
            id: '',
            subject: {
              path: '',
              name: '',
            },
            __typename: 'DuplicateSubscriptionError',
          },
        },
      },
    };
    mocked(mockAxios.post).mockResolvedValueOnce(expected);

    const actual = await notifyMeNetworker.createSubscription(
      VIN,
      ACCESS_TOKEN
    );

    expect(actual).toEqual(expected.data);
    const options = {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    };
    const variables = {
      filters: `{ "vin":"${VIN}" }`,
      subject: 'inventory/available-now',
    };
    const notifyMeQuery = `
    mutation createSub($subject: String!, $filters: String!) {  hornCreateSubscription(subject: $subject, filters: $filters) {
      ... on SubjectSubscription {
        __typename
        subject {        
          path
          name
        }
        id
        filters
      }
      ... on DuplicateSubscriptionError {
        __typename
        message
      }
      ... on ValidationError {
        __typename
        title
        details {
          message
          path
          property
        }
      }
    }
  }`.trim();
    const data: GearboxRequest = {
      query: notifyMeQuery,
      variables,
      operationName: 'createSub',
    };
    expect(mockAxios.post).toHaveBeenCalledWith(BASE_URL, data, options);
  });
});
