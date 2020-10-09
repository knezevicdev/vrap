import { Car, Hit } from '@vroom-web/inv-search-networking';

import SimilarVehiclesViewModel from './ViewModel';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { InventoryStore } from 'src/modules/inventory/store';

jest.mock('src/integrations/AnalyticsHandler');
jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

const source: Car = {
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
  isAvailableToSell: false,
};

describe('Similar Vehicles View Model', () => {
  describe('getCars', () => {
    const store = new InventoryStore();
    const analyticsHandler = new AnalyticsHandler();
    const viewModel = new SimilarVehiclesViewModel(store, analyticsHandler);

    test('getCars when null similar cars, should return []', () => {
      expect(viewModel.getCars()).toEqual([]);
    });

    test('getCars when 0 similar cars, should return []', () => {
      store.similar = [];
      expect(viewModel.getCars()).toEqual([]);
    });

    test('getCars when similar cars > 0, should return those similar cars', () => {
      const similar: Hit[] = [
        {
          _source: source,
        },
      ];
      store.similar = similar;
      const expected: Car[] = [source];
      expect(viewModel.getCars()).toEqual(expected);
    });

    test('getCars when similar cars > 4, should only return 4 cars', () => {
      const similar: Hit[] = Array(7).fill({
        _source: source,
      });
      store.similar = similar;
      const expected: Car[] = Array(4).fill(source);
      expect(viewModel.getCars()).toEqual(expected);
      expect(analyticsHandler.trackProductListViewed).toBeCalled();
    });
  });
});
