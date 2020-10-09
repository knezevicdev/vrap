/* eslint-disable @typescript-eslint/camelcase */
import { FiltersData } from '@vroom-web/catalog-url-integration';

import ViewModel from './ViewModel';

import { CarsStore } from 'src/modules/cars/store';
jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

describe('Inventory View Model', () => {
  let store: CarsStore;
  let viewModel: ViewModel;

  beforeEach(() => {
    store = new CarsStore();
    viewModel = new ViewModel(store);
  });

  describe('Hide Vehicle Count', () => {
    it('should hide Vehicle Count when no filters', () => {
      const hideCount = viewModel.hideVehicleCount();
      expect(hideCount).toEqual(true);
    });

    it('should hide Vehicle Count when only Page Filter', () => {
      const filters: FiltersData = {
        page: 20,
      };
      store.filtersData = filters;
      const hideCount = viewModel.hideVehicleCount();
      expect(hideCount).toEqual(true);
    });

    it('should show Vehicle Count when > 1 Filter', () => {
      const filters: FiltersData = {
        page: 20,
        search: 'subaru',
      };
      store.filtersData = filters;
      const hideCount = viewModel.hideVehicleCount();
      expect(hideCount).toEqual(false);
    });

    it('should show Vehicle Count when 1 Filter that is not page', () => {
      const filters: FiltersData = {
        search: 'subaru',
      };
      store.filtersData = filters;
      const hideCount = viewModel.hideVehicleCount();
      expect(hideCount).toEqual(false);
    });
  });

  describe('Hide Pagination', () => {
    it('should hide Pagination when no inventory', () => {
      store.inventoryData = {
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
      const hidePagination = viewModel.hidePagination();
      expect(hidePagination).toEqual(true);
    });
    it('should show Pagination when inventory', () => {
      store.inventoryData = {
        hits: {
          total: 1,
          hits: [],
        },
        aggregations: {
          make_count: {
            buckets: [],
          },
        },
      };
      const hidePagination = viewModel.hidePagination();
      expect(hidePagination).toEqual(false);
    });
  });
});
