import { Car, Hit } from '@vroom-web/inv-search-networking';

import data from '../../testCar.json';
import SimilarVehiclesViewModel from './ViewModel';

import { InventoryStore } from 'src/modules/inventory/store';

jest.mock('src/integrations/AnalyticsHandler');
jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

describe('Similar Vehicles View Model', () => {
  describe('getCars', () => {
    const store = new InventoryStore();
    const viewModel = new SimilarVehiclesViewModel(store);

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
          _source: data,
        },
      ];
      store.similar = similar;
      const expected: Car[] = [data];
      expect(viewModel.getCars()).toEqual(expected);
    });

    test('getCars when similar cars > 4, should only return 4 cars', () => {
      const similar: Hit[] = Array(7).fill({
        _source: data,
      });
      store.similar = similar;
      const expected: Car[] = Array(4).fill(data);
      expect(viewModel.getCars()).toEqual(expected);
    });
  });
});
