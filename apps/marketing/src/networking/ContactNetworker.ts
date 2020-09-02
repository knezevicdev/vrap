import axios, { AxiosInstance } from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

interface PostZendeskRequestData {
  request: {
    requester: {
      name: string;
      email: string;
    };
    subject: string;
    comment: {
      body: string;
    };
    brand: string;
    form: string;
  };
}

export class ContactNetworker {
  private readonly axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance = axios.create()) {
    this.axiosInstance = axiosInstance;
  }

  postZendeskTicket(data: PostZendeskRequestData): Promise<void> {
    const url = publicRuntimeConfig.CREATE_ZENDESK_REQUEST_URL;
    return this.axiosInstance.post(url, data);
  }
}
