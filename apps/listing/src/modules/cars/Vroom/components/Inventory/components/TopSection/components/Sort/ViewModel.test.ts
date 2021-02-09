import {
  Filters,
  SortBy,
  SortDirection,
} from '@vroom-web/catalog-url-integration';

import ViewModel from './ViewModel';

import {
  SortAPIBy,
  SortAPIDirection,
  SortDisplay,
  sorts,
} from 'src/modules/cars/data';
import { CarsStore } from 'src/modules/cars/store';

jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

describe('Sort ViewModel Tests', () => {
  describe('getActiveSortValue', () => {
    it('getActiveSortValue returns viewModel.nonSortDisplay when there is no filterData', () => {
      const store = new CarsStore();
      const viewModel = new ViewModel(store);
      expect(viewModel.getActiveSortValue()).toBe(viewModel.nonSortDisplay);
    });
    it('getActiveSortValue returns viewModel.nonSortDisplay when there is filterData but no sort filterData', () => {
      const store = new CarsStore();
      store.filtersData = {
        [Filters.PAGE]: 3,
      };
      const viewModel = new ViewModel(store);
      expect(viewModel.getActiveSortValue()).toBe(viewModel.nonSortDisplay);
    });
    it('getActiveSortValue returns viewModel.nonSortDisplay when there is sort filterData but no matching sort - SortBy', () => {
      const store = new CarsStore();
      store.filtersData = {
        [Filters.SORT]: {
          by: ('value' as unknown) as SortBy,
          direction: SortDirection.ASCENDING,
        },
      };
      const viewModel = new ViewModel(store);
      expect(viewModel.getActiveSortValue()).toBe(viewModel.nonSortDisplay);
    });
    it('getActiveSortValue returns viewModel.nonSortDisplay when there is sort filterData but no matching sort - SortDirection', () => {
      const store = new CarsStore();
      store.filtersData = {
        [Filters.SORT]: {
          by: SortBy.PRICE,
          direction: ('value' as unknown) as SortDirection,
        },
      };
      const viewModel = new ViewModel(store);
      expect(viewModel.getActiveSortValue()).toBe(viewModel.nonSortDisplay);
    });
    it('getActiveSortValue returns matchingSort display when a match is found', () => {
      const store = new CarsStore();
      store.filtersData = {
        [Filters.SORT]: {
          by: SortBy.PRICE,
          direction: SortDirection.ASCENDING,
        },
      };
      const viewModel = new ViewModel(store);
      expect(viewModel.getActiveSortValue()).toBe(SortDisplay.LOWEST_PRICE);
    });
  });

  describe('getSorts', () => {
    it('getSorts returns sorts', () => {
      const store = new CarsStore();
      const viewModel = new ViewModel(store);
      expect(viewModel.getSorts()).toEqual(sorts);
    });
  });

  describe('handleChange', () => {
    it('handleChange calls store.updateFiltersData when no sort object is passed', () => {
      const store = new CarsStore();
      store.updateFiltersData = jest.fn();
      const viewModel = new ViewModel(store);
      viewModel.handleChange();
      expect(store.updateFiltersData).toHaveBeenCalledWith({
        [Filters.SORT]: undefined,
      });
    });
    it('handleChange calls store.updateFiltersData when a sort object is passed', () => {
      const store = new CarsStore();
      store.updateFiltersData = jest.fn();
      const sort = {
        apiBy: SortAPIBy.LISTING_PRICE,
        apiDirection: SortAPIDirection.ASCENDING,
        display: SortDisplay.LOWEST_PRICE,
        filtersDataByValue: SortBy.PRICE,
        filtersDataDirectionValue: SortDirection.ASCENDING,
      };
      const viewModel = new ViewModel(store);
      viewModel.handleChange(sort);
      expect(store.updateFiltersData).toHaveBeenCalledWith({
        [Filters.SORT]: {
          by: SortBy.PRICE,
          direction: SortDirection.ASCENDING,
        },
      });
    });
  });
});
