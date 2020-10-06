import { Car } from '@vroom-web/inv-search-networking';
import data from '../../testCar.json';

import FavoritesNetworker, {
  AddFavroiteResponse,
  FavoritesListResponse,
  RemoveFavroiteResponse,
} from './FavoritesNetworker';
import { FavoritesStore } from './store';
import ViewModel from './ViewModel';

import { InventoryStore } from 'src/modules/inventory/store';

jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

const car: Car = data;

describe('Favorites View Model', () => {
  const inventoryStore = new InventoryStore();
  inventoryStore.vehicle._source = car;

  const favoriteStore = new FavoritesStore();
  favoriteStore.accessToken = 'access-token';
  favoriteStore.initClientSide = jest.fn();
  favoriteStore.setFavorited = jest.fn();
  favoriteStore.setSnackbar = jest.fn();
  favoriteStore.setLoading = jest.fn();
  favoriteStore.isError = false;

  const favoriteNetworker = new FavoritesNetworker('url');

  const viewModel = new ViewModel(
    inventoryStore,
    favoriteStore,
    favoriteNetworker
  );

  test('check favorites', async () => {
    const favoriteListResponse: FavoritesListResponse = {
      data: {
        data: {
          user: {
            favoriteVehicles: [
              {
                vin: 'some-vin',
              },
            ],
          },
        },
      },
    };
    favoriteNetworker.listFavorites = jest
      .fn()
      .mockResolvedValue(favoriteListResponse);

    await viewModel.checkFavorites();
    expect(favoriteStore.setFavorited).toHaveBeenCalled();
    expect(favoriteStore.setLoading).toHaveBeenCalledTimes(2);
  });

  test('add favorite', async () => {
    const addFavoritesResponse: AddFavroiteResponse = {
      data: {
        data: {
          userAddFavoriteVehicles: {
            favoriteVehicles: [
              {
                vin: 'some-vin',
              },
            ],
          },
        },
      },
    };
    favoriteNetworker.addFavorite = jest
      .fn()
      .mockResolvedValue(addFavoritesResponse);

    await viewModel.addFavorite();
    expect(favoriteStore.setFavorited).toHaveBeenCalled();
    expect(favoriteStore.setSnackbar).toHaveBeenCalled();
  });

  test('remove favorite', async () => {
    const removeFavoritesResponse: RemoveFavroiteResponse = {
      data: {
        data: {
          userRemoveFavoriteVehicles: {
            favoriteVehicles: [],
          },
        },
      },
    };
    favoriteNetworker.removeFavorite = jest
      .fn()
      .mockResolvedValue(removeFavoritesResponse);

    await viewModel.addFavorite();
    expect(favoriteStore.setFavorited).toHaveBeenCalled();
    expect(favoriteStore.setSnackbar).toHaveBeenCalled();
  });
});
