import axios, { AxiosInstance } from 'axios';
import { mocked } from 'ts-jest/utils';

import FavoritesNetworker, {
  AddFavroiteResponse,
  FavoritesListResponse,
  RemoveFavroiteResponse,
} from './FavoritesNetworker';

jest.mock('axios');
const mockAxios: AxiosInstance = jest.genMockFromModule('axios');
const VIN = 'some-vin';
const ACCESS_TOKEN = 'access-token';
const BASE_URL = 'fake-url';

describe('Favorites Networker', () => {
  it('should list favorites', async () => {
    mocked(axios.create).mockImplementationOnce(() => mockAxios);
    const favoriteNetworker: FavoritesNetworker = new FavoritesNetworker(
      BASE_URL
    );
    const expected: FavoritesListResponse = {
      data: {
        data: {
          user: {
            favoriteVehicles: [
              {
                vin: VIN,
              },
            ],
          },
        },
      },
    };
    mocked(mockAxios.post).mockResolvedValueOnce(expected.data);

    const actual: FavoritesListResponse = await favoriteNetworker.listFavorites(
      ACCESS_TOKEN
    );

    expect(actual).toEqual(expected.data);
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
    const options = {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    };
    expect(mockAxios.post).toHaveBeenCalledWith(BASE_URL, data, options);
  });

  it('should add a favorite', async () => {
    mocked(axios.create).mockImplementationOnce(() => mockAxios);
    const favoriteNetworker: FavoritesNetworker = new FavoritesNetworker(
      BASE_URL
    );
    const expected: AddFavroiteResponse = {
      data: {
        data: {
          userAddFavoriteVehicles: {
            favoriteVehicles: [
              {
                vin: VIN,
              },
            ],
          },
        },
      },
    };
    mocked(mockAxios.post).mockResolvedValueOnce(expected.data);

    const actual: AddFavroiteResponse = await favoriteNetworker.addFavorite(
      ACCESS_TOKEN,
      VIN
    );

    expect(actual).toEqual(expected.data);
    const options = {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    };
    const variables = {
      vin: VIN,
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
    const data = {
      query: checkFavoriteQuery,
      variables,
    };
    expect(mockAxios.post).toHaveBeenCalledWith(BASE_URL, data, options);
  });

  it('should remove favorite', async () => {
    mocked(axios.create).mockImplementationOnce(() => mockAxios);
    const favoriteNetworker: FavoritesNetworker = new FavoritesNetworker(
      'fake-url'
    );
    const expected: RemoveFavroiteResponse = {
      data: {
        data: {
          userRemoveFavoriteVehicles: {
            favoriteVehicles: [
              {
                vin: VIN,
              },
            ],
          },
        },
      },
    };
    mocked(mockAxios.post).mockResolvedValue(expected.data);

    const actual: RemoveFavroiteResponse = await favoriteNetworker.removeFavorite(
      'access-token',
      VIN
    );

    expect(actual).toEqual(expected.data);

    const options = {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    };
    const variables = {
      vin: VIN,
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
    const data = {
      query: checkFavoriteQuery,
      variables,
    };

    expect(mockAxios.post).toHaveBeenCalledWith(BASE_URL, data, options);
  });
});
