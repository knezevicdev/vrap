import { Car, Hit } from '@vroom-web/inv-search-networking';

import SimilarVehiclesViewModel from './ViewModel';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { InventoryStore } from 'src/modules/inventory/store';

jest.mock('src/integrations/AnalyticsHandler');
jest.mock('next/config', () => {
  return () => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

const source: Car = {
  vin: 'JF2SJABC9JH572398',
  bodyType: 'Wagon',
  interiorPhotoUrl:
    'https://i.fyu.se/group/0e8fnp23g97si8m0/ydbw2a5jmc78v/snaps/img_M3SHTBFAhwb5lErz.jpg',
  diesel: 0,
  leadFlagPhotoUrl:
    'https://i.fyu.se/group/0e8fnp23g97si8m0/ydbw2a5jmc78v/snaps/img_32pgVhc6ST9ILieY.jpg',
  listingPrice: 19080,
  color: 'Red',
  year: 2018,
  leadFlagPhotoUrlHiRes:
    'https://i.fyu.se/group/0e8fnp23g97si8m0/ydbw2a5jmc78v/snaps/img_32pgVhc6ST9ILieY.jpg',
  subjectLine: '2018 SUBARU FORESTER',
  warrantyRemaining: '11 months or 5,480 miles',
  miles: 30520,
  interiorPhotoUrlHiRes:
    'https://i.fyu.se/group/0e8fnp23g97si8m0/ydbw2a5jmc78v/snaps/img_M3SHTBFAhwb5lErz.jpg',
  dvd: 0,
  transmission: 'Automatic',
  trim: '2.5i',
  engine: '2.5L H4 170hp 174ft. lbs.',
  hiresPhotos: [],
  warranty: 0,
  model: 'Forester',
  modelSlug: 'forester',
  extColor: 'Red',
  text:
    '2018 SUBARU FORESTER JF2SJABC9JH572398 10418659 572398 JH572398 Red Red Sedan Wagon    ',
  engId: 2,
  bodyId: 2043,
  make: 'Subaru',
  makeSlug: 'subaru',
  vehicleType: 'Sedan',
  doorCount: 4,
  roof: 1,
  nav: 0,
  warrantyOriginal: '36 months or 36,000 miles',
  driveType: 'AWD',
  intColor: 'Gray',
  cylinders: 4,
  awd: 0,
  fuelType: 'Gasoline',
  leadPhotoUrlHiRes:
    'https://i.fyu.se/group/0e8fnp23g97si8m0/ydbw2a5jmc78v/snaps/img_32pgVhc6ST9ILieY.jpg',
  leadPhotoUrl:
    'https://i.fyu.se/group/0e8fnp23g97si8m0/ydbw2a5jmc78v/snaps/img_32pgVhc6ST9ILieY.jpg',
  style: '',
  optionalFeatures: 'Wheel Locks,All-Weather Floor Mats,Roof Rack',
  zone: 'R - Retrieve Unit',
  soldStatus: 0,
  otherPhotos: null,
  defectPhotos: null,
  ownerCount: 1,
  cityMpg: 0,
  highwayMpg: 0,
  inventoryId: 10418659,
  frontTrackWidth: 60.9,
  rearTrackWidth: 61.1,
  wheelBase: 103.9,
  width: 80.5,
  length: 181.5,
  groundClearance: 8.7,
  height: 66.4,
  hasStockPhotos: false,
  consignmentPartnerId: '',
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
