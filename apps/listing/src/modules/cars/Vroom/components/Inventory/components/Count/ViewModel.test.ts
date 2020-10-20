/* eslint-disable @typescript-eslint/camelcase */
import { Inventory } from '@vroom-web/inv-search-networking';

import ViewModel from './ViewModel';

import { CarsStore } from 'src/modules/cars/store';
jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

describe('Count View Model', () => {
  const store = new CarsStore();
  const viewModel = new ViewModel(store);

  let inventory: Inventory;

  beforeEach(() => {
    inventory = {
      hits: {
        total: 0,
        hits: [],
      },
      aggregations: {
        make_count: {
          buckets: [],
        },
      },
    };
  });

  describe('Get Count', () => {
    it('should not return anything if count is 0', () => {
      store.inventoryData = inventory;
      const count = viewModel.getCount();
      expect(count).toBeUndefined();
    });

    it('should return count if count > 0', () => {
      inventory.hits.total = 100;
      store.inventoryData = inventory;
      const count = viewModel.getCount();
      expect(count).toEqual('100');
    });

    it('should return count in the right format', () => {
      inventory.hits.total = 100000;
      store.inventoryData = inventory;
      const count = viewModel.getCount();
      expect(count).toEqual('100,000');
    });
  });

  describe('Get Message', () => {
    it('should not return anything if count is 0', () => {
      store.inventoryData = inventory;
      const count = viewModel.getCount();
      expect(count).toBeUndefined();
    });

    it('should return Vehicle Found if count is 1', () => {
      inventory.hits.total = 1;
      store.inventoryData = inventory;
      const countText = viewModel.getCountText();
      expect(countText).toEqual('Vehicle Found');
    });

    it('should return Vehicles Found if count > 1', () => {
      inventory.hits.total = 2;
      store.inventoryData = inventory;
      const countText = viewModel.getCountText();
      expect(countText).toEqual('Vehicles Found');
    });
  });
});
