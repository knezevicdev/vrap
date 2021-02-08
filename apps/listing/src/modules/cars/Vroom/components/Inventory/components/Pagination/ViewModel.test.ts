import {
  Filters,
  FiltersData,
  setPage,
} from '@vroom-web/catalog-url-integration';
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

jest.mock('@vroom-web/catalog-url-integration', () => {
  const actualImport = jest.requireActual('@vroom-web/catalog-url-integration');
  return {
    ...actualImport,
    setPage: jest.fn(),
  };
});
const mockSetPage = (setPage as unknown) as jest.Mock<FiltersData>;

describe('Pagination ViewModel Tests', () => {
  describe('getPageAndCount', () => {
    it('getPageAndCount return when there is filterData and inventoryData.hits.total', () => {
      const store = new CarsStore();
      store.filtersData = {};
      store.inventoryData = {
        hits: {
          total: 90,
        },
      } as Inventory;
      const viewModel = new ViewModel(store);
      expect(viewModel.getPageAndCount()).toEqual({ page: 1, count: 4 });
    });
    it('getPageAndCount return when there is filterData and no inventoryData.hits.total', () => {
      const store = new CarsStore();
      store.filtersData = {};
      const viewModel = new ViewModel(store);
      expect(viewModel.getPageAndCount()).toEqual({ page: 1, count: 1 });
    });
    it('getPageAndCount return when there is page filterData', () => {
      const store = new CarsStore();
      store.filtersData = {
        [Filters.PAGE]: 3,
      };
      const viewModel = new ViewModel(store);
      expect(viewModel.getPageAndCount()).toEqual({ page: 3, count: 1 });
    });
  });

  describe('onChange', () => {
    it('onChange calls setPage and store.updateFiltersData', () => {
      const store = new CarsStore();
      const page = 6;
      store.updateFiltersData = jest.fn();
      store.filtersData = {
        [Filters.PAGE]: 3,
      };
      mockSetPage.mockImplementation(() => {
        return { [Filters.PAGE]: page };
      });
      const viewModel = new ViewModel(store);
      viewModel.onChange(page);
      expect(mockSetPage).toHaveBeenCalledWith(page, store.filtersData);
      expect(store.updateFiltersData).toHaveBeenCalledWith({ page }, true);
    });
  });
});
