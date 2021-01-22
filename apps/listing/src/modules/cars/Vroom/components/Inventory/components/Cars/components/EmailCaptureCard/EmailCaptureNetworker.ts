import axios, { AxiosInstance } from 'axios';

export interface PostEmailCaptureRequestData {
  payload: {
    emailAddress: string;
    marketingId: string;
    userId?: string;
    searchParams?: {
      modelSlug?: string[];
      searchall?: string;
    };
  };
}

type Data = {
  success: boolean;
};

export type PostEmailCaptureResponse = {
  data: Data;
};

export interface EmailCaptureNetworking {
  postEmailCapture(
    data: PostEmailCaptureRequestData
  ): Promise<PostEmailCaptureResponse>;
}

export default class EmailCaptureNetworker implements EmailCaptureNetworking {
  private readonly axiosInstance: AxiosInstance;
  private readonly hostUrl: string;

  constructor(hostUrl: string) {
    this.axiosInstance = axios.create();
    this.hostUrl = hostUrl;
  }

  async postEmailCapture(
    data: PostEmailCaptureRequestData
  ): Promise<PostEmailCaptureResponse> {
    const url = `${this.hostUrl}/v2/email-capture`;

    const response = await this.axiosInstance.post(url, data);

    return response.data as PostEmailCaptureResponse;
  }
}
