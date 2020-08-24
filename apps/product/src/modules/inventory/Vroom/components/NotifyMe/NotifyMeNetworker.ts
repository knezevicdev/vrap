import axios, { AxiosInstance } from 'axios';

export default class NotifyMeNetworker {
  private readonly axiosInstance: AxiosInstance;
  private readonly hostUrl: string;

  constructor(hostUrl: string) {
    this.axiosInstance = axios.create();
    this.hostUrl = 'https://gearbox-dev-int.vroomapi.com/query-private'; //hostUrl;
  }

  async registerEmail(accessToken: string | undefined): Promise<void> {
    const options = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    // const payload: NotifyMeRequest = {
    //   correlationId: `${Math.floor(Math.random() * 1000000)}`,
    //   version: '1',
    //   timestamp: `${Date.now()}`,
    //   source: 'vroom-web',
    //   payload: {
    //     type: 'email',
    //   },
    // };
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
    const data = {
      notifyMeRegisterQuery,
      variables,
      operationName: 'createDevice',
    };
    return await this.axiosInstance.post(this.hostUrl, data, options);
  }

  async createSubscription(
    vin: string,
    accessToken: string | undefined
  ): Promise<any> {
    const options = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    // const payload: NotifyMeRequest = {
    //   correlationId: `${Math.floor(Math.random() * 1000000)}`,
    //   version: '1',
    //   timestamp: `${Date.now()}`,
    //   source: 'vroom-web',
    //   payload: {
    //     subject: 'inventory/available-now',
    //     filters: {
    //       vin,
    //     },
    //   },
    // };
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
    const data = { notifyMeQuery, variables, operationName: 'createSub' };
    return await this.axiosInstance.post(this.hostUrl, data, options);
  }
}
