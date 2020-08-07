import axios, { AxiosInstance } from 'axios';

interface NotfifyMePayload {
  type?: string;
  subject?: string;
  filters?: {
    vin?: string;
    make?: string;
    model?: string;
  };
}
interface NotifyMeRequest {
  correlationId: string;
  version: string;
  timestamp: string;
  source: string;
  payload: NotfifyMePayload;
}

export default class NotifyMeNetworker {
  private readonly axiosInstance: AxiosInstance;
  private readonly hostUrl: string;

  constructor(hostUrl: string) {
    this.axiosInstance = axios.create();
    this.hostUrl = hostUrl;
  }

  async registerEmail(): Promise<void> {
    const url = `${this.hostUrl}/v2/devices`;
    const payload: NotifyMeRequest = {
      correlationId: `${Math.random() * 1000000}`,
      version: '1',
      timestamp: `${Date.now()}`,
      source: 'vroom-web',
      payload: {
        type: 'email',
      },
    };
    await this.axiosInstance.post(url, payload);
  }

  async createSubscription(vin: string, accessToken: string): Promise<void> {
    const url = `${this.hostUrl}/v2/subscriptions`;
    const options = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const payload: NotifyMeRequest = {
      correlationId: `${Math.random() * 1000000}`,
      version: '1',
      timestamp: `${Date.now()}`,
      source: 'vroom-web',
      payload: {
        subject: 'inventory/available-now',
        filters: {
          vin,
        },
      },
    };
    const response = await this.axiosInstance.post(url, payload, options);
  }
}
