import axios, { AxiosInstance } from 'axios';

export interface FavoritesListResponse {
  data: {
    data: {
      user: {
        favoriteVehicles: [
          {
            vin: string;
          }
        ];
      };
    };
  };
}

export default class FavoritesNetworker {
  private readonly axiosInstance: AxiosInstance;
  private readonly hostUrl: string;

  constructor(hostUrl: string) {
    this.axiosInstance = axios.create();
    this.hostUrl = hostUrl;
  }

  async listFavorites(
    accessToken: string | undefined
  ): Promise<FavoritesListResponse> {
    const options = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const checkFavoriteQuery = `
      {
        user {
          favoriteVehicles {
            vin
          }
        }
      }
    `.trim();
    const data = { query: checkFavoriteQuery };
    return await this.axiosInstance.post(this.hostUrl, data, options);
  }
}
