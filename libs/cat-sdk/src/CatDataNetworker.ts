import axios, { AxiosInstance } from 'axios';

import { CatData } from './types';

export interface CatDataNetworkerOptions {
  basePath?: string;
  timeout?: number;
}

class CatDataNetworker {
  private readonly axiosInstance: AxiosInstance;
  private readonly basePath: string;

  constructor(options?: CatDataNetworkerOptions) {
    const timeout = (options && options.timeout) || 1000;
    this.axiosInstance = axios.create({
      timeout,
    });
    // By default, hit the same host, e.g. https://vroom.com/cat-data.
    this.basePath = (options && options.basePath) || '';
  }

  async getCatData(uuid: string): Promise<CatData> {
    const response = await this.axiosInstance.get<CatData>(
      `${this.basePath}/cat-data/${uuid}${window.location.search}`
    );
    return response.data;
  }
}

export default CatDataNetworker;
