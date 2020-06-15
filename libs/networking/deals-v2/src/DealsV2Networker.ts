import axios, { AxiosInstance } from 'axios';

import {
  GetMyDealsResponse,
  getMyDealsResponseSchema,
} from './types/GetMyDeals';

export interface DealsV2Networking {
  getMyDeals(accessToken: string): Promise<GetMyDealsResponse>;
}

export default class DealsV2Networker implements DealsV2Networking {
  private readonly axiosInstance: AxiosInstance;
  private readonly hostUrl: string;

  constructor(hostUrl: string) {
    this.axiosInstance = axios.create();
    this.hostUrl = hostUrl;
  }

  // FIT-502. This uses a graphql endpoint.
  // We should return to this and decide the best way to use graphql.
  async getMyDeals(accessToken: string): Promise<GetMyDealsResponse> {
    const query = `{
      user {
        deals {
          dealSummary {
            dealStatus {
              status
              step
            }
            inventory {
              pricing {
                listPrice
              }
              vehicle {
                make
                model
                trim
                vin
                year
              }
            }
          }
        }
      }
    }`.trim();
    const data = { query };
    const response = await this.axiosInstance.post(this.hostUrl, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    await getMyDealsResponseSchema.validate(response.data);
    return response.data as GetMyDealsResponse;
  }
}
