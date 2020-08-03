import axios, { AxiosInstance } from 'axios';

export type LoggedInResponse = {};

interface FavoritesNetworking {
  isLoggedIn(): Promise<LoggedInResponse>;
}

//TECH DEBT: This will be broken out into a larger 'my account' networking library
export default class FavoritesNetworker implements FavoritesNetworking {
  private readonly axiosInstance: AxiosInstance;
  private readonly hostUrl: string;

  constructor(hostUrl: string) {
    this.axiosInstance = axios.create();
    this.hostUrl = hostUrl;
  }

  async isLoggedIn(): Promise<LoggedInResponse> {
    const query = '{version}';
    const data = { query };
    try {
      const response = await this.axiosInstance.post(`${this.hostUrl}`, data);
      return response;
    } catch (err) {
      return { error: 'broken' };
    }
  }
}
