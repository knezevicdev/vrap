import axios, { AxiosInstance, AxiosResponse } from 'axios';

export interface GearboxRequest {
  query: string;
  variables: object;
  operationName: string;
}

interface SubjectSubscription {
  filters: string;
  id: string;
  subject: {
    path: string;
    name: string;
  };
  __typename: string;
}

interface DuplicateSubscriptionError {
  __typename: string;
  message: string;
}

interface ValidationError {
  __typename: string;
  title: string;
  details: {
    message: string;
    path: string;
    property: string;
  };
}

export interface CreateSubscriptionResponse {
  data: {
    hornCreateSubscription:
      | SubjectSubscription
      | DuplicateSubscriptionError
      | ValidationError;
  };
}

export interface Device {
  __typename: string;
  id: string;
  type: string;
}

export interface CreateDeviceResponse {
  data: {
    hornCreateDevice: Device | ValidationError;
  };
}

export interface ListSubscriptionResponse {
  data: {
    data: {
      hornListSubscriptions: {
        subscriptions: SubjectSubscription[];
        nextpage: any;
      };
    };
  };
}

export default class NotifyMeNetworker {
  private readonly axiosInstance: AxiosInstance;
  private readonly hostUrl: string;

  constructor(hostUrl: string) {
    this.axiosInstance = axios.create();
    this.hostUrl = hostUrl;
  }

  async listSubscription(
    accessToken: string | undefined
  ): Promise<ListSubscriptionResponse> {
    const options = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
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
    return await this.axiosInstance.post(this.hostUrl, data, options);
  }

  async registerEmail(accessToken: string | undefined): Promise<void | Error> {
    const options = {
      headers: { Authorization: `Bearer ${accessToken}` },
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
    const registerReturn: AxiosResponse<CreateDeviceResponse> = await this.axiosInstance.post(
      this.hostUrl,
      data,
      options
    );
    if (registerReturn.data?.data.hornCreateDevice.__typename === 'Device') {
      return;
    } else {
      return new Error();
    }
  }

  async createSubscription(
    vin: string,
    accessToken: string | undefined
  ): Promise<CreateSubscriptionResponse | Error> {
    const options = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const variables = {
      filters: `{ "vin":"${vin}" }`,
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
    const createSubResponse: AxiosResponse<CreateSubscriptionResponse> = await this.axiosInstance.post(
      this.hostUrl,
      data,
      options
    );
    const typename =
      createSubResponse.data?.data.hornCreateSubscription.__typename;

    if (
      typename === 'SubjectSubscription' ||
      typename === 'DuplicateSubscriptionError'
    ) {
      return createSubResponse.data;
    } else {
      return new Error();
    }
  }
}
