import { Car } from '@vroom-web/inv-search-networking';

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

const car: Car = {
  vin: 'some-vin',
  bodyType: '',
  interiorPhotoUrl: '',
  diesel: 0,
  leadFlagPhotoUrl: '',
  listingPrice: 0,
  color: '',
  year: 0,
  leadFlagPhotoUrlHiRes: '',
  subjectLine: '',
  warrantyRemaining: '',
  miles: 0,
  interiorPhotoUrlHiRes: '',
  dvd: 0,
  transmission: '',
  trim: '',
  engine: '',
  hiresPhotos: [],
  warranty: 0,
  model: '',
  modelSlug: '',
  extColor: '',
  text: '',
  engId: 0,
  bodyId: 0,
  make: '',
  makeSlug: '',
  vehicleType: '',
  doorCount: 0,
  roof: 0,
  nav: 0,
  warrantyOriginal: '',
  driveType: '',
  intColor: '',
  cylinders: 0,
  awd: 0,
  fuelType: '',
  leadPhotoUrlHiRes: '',
  leadPhotoUrl: '',
  style: '',
  optionalFeatures: '',
  zone: '',
  soldStatus: 0,
  otherPhotos: null,
  defectPhotos: null,
  ownerCount: 1,
  cityMpg: 0,
  highwayMpg: 0,
  inventoryId: 0,
  frontTrackWidth: 0,
  rearTrackWidth: 0,
  wheelBase: 0,
  width: 0,
  length: 0,
  groundClearance: 0,
  height: 0,
  hasStockPhotos: false,
  consignmentPartnerId: '',
};

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
