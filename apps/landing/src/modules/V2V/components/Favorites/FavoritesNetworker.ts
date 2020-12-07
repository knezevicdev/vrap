import axios, { AxiosInstance } from 'axios';

interface GearboxRequest {
  query: string;
  variables: object;
}

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

export interface AddFavoriteResponse {
  data: {
    data: {
      userAddFavoriteVehicles: {
        favoriteVehicles: [
          {
            vin: string;
          }
        ];
      };
    };
  };
}

export interface RemoveFavoriteResponse {
  data: {
    data: {
      userRemoveFavoriteVehicles: {
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

  async addFavorite(
    accessToken: string | undefined,
    vin: string
  ): Promise<AddFavoriteResponse> {
    const options = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const variables = {
      vin,
      source: 'vroom.com',
    };
    const checkFavoriteQuery = `
      mutation ($vin: String! $source: String!) {
        userAddFavoriteVehicles(vin: $vin, source: $source){
          favoriteVehicles {
            vin
          }
        }
      }
    `.trim();
    const data: GearboxRequest = {
      query: checkFavoriteQuery,
      variables,
    };
    return await this.axiosInstance.post(this.hostUrl, data, options);
  }

  async removeFavorite(
    accessToken: string | undefined,
    vin: string
  ): Promise<RemoveFavoriteResponse> {
    const options = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const variables = {
      vin,
      source: 'vroom.com',
    };
    const checkFavoriteQuery = `
      mutation ($vin: String! $source: String!) {
        userRemoveFavoriteVehicles(vin: $vin, source: $source){
          favoriteVehicles {
            vin
          }
        }
      }
    `.trim();
    const data: GearboxRequest = {
      query: checkFavoriteQuery,
      variables,
    };
    return await this.axiosInstance.post(this.hostUrl, data, options);
  }
}
