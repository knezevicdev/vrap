import {
  Filters,
  FiltersData,
  resetFilter,
  setPrice,
} from '@vroom-web/catalog-url-integration';

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
    setPrice: jest.fn(),
    resetFilter: jest.fn(),
  };
});
const mockSetPrice = (setPrice as unknown) as jest.Mock<FiltersData>;
const mockResetFilter = (resetFilter as unknown) as jest.Mock<FiltersData>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Price ViewModel Tests', () => {
  describe('getPrice', () => {
    it('getPrice returns undefined when there is no filtersData', () => {
      const store = new CarsStore();
      store.filtersData = undefined;
      const viewModel = new ViewModel(store);
      expect(viewModel.getPrice()).toBe(undefined);
    });
    it('getPrice returns undefined when there is filtersData but no price filtersData', () => {
      const store = new CarsStore();
      store.filtersData = {};
      const viewModel = new ViewModel(store);
      expect(viewModel.getPrice()).toBe(undefined);
    });
    it('getPrice returns price filtersData when there is price filtersData', () => {
      const store = new CarsStore();
      store.filtersData = { [Filters.PRICE]: { max: 65000, min: 5000 } };
      const viewModel = new ViewModel(store);
      expect(viewModel.getPrice()).toEqual({ max: 65000, min: 5000 });
    });
  });

  describe('handleMaxAndMinInputsChange', () => {
    it('handleMaxAndMinInputsChange updates the price filter when a value is passed', () => {
      const store = new CarsStore();
      const spy = spyOn(store, 'updateFiltersData');
      mockSetPrice.mockImplementation(() => {
        return { [Filters.PRICE]: { max: 45000, min: 12000 } };
      });
      const viewModel = new ViewModel(store);
      viewModel.handleMaxAndMinInputsChange({ max: 45000, min: 12000 });
      expect(mockSetPrice).toBeCalledTimes(1);
      expect(spy).toBeCalledWith({
        [Filters.PRICE]: { max: 45000, min: 12000 },
      });
    });
    it('handleMaxAndMinInputsChange resets the price filter when no value is passed', () => {
      const store = new CarsStore();
      const spy = spyOn(store, 'updateFiltersData');
      mockResetFilter.mockImplementation(() => {
        return { [Filters.PRICE]: { max: 200000, min: 0 } };
      });
      const viewModel = new ViewModel(store);
      viewModel.handleMaxAndMinInputsChange();
      expect(mockResetFilter).toBeCalledTimes(1);
      expect(spy).toBeCalledWith({
        [Filters.PRICE]: { max: 200000, min: 0 },
      });
    });
  });

  describe('isResetButtonDisabled', () => {
    it('isResetButtonDisabled returns true when there is no filtersData', () => {
      const store = new CarsStore();
      store.filtersData = undefined;
      const viewModel = new ViewModel(store);
      expect(viewModel.isResetButtonDisabled()).toBe(true);
    });
    it('isResetButtonDisabled returns true when there is filtersData but no price filtersData', () => {
      const store = new CarsStore();
      store.filtersData = {};
      const viewModel = new ViewModel(store);
      expect(viewModel.isResetButtonDisabled()).toBe(true);
    });
    it('isResetButtonDisabled returns false when there is price filtersData', () => {
      const store = new CarsStore();
      store.filtersData = { [Filters.PRICE]: { max: 200000, min: 0 } };
      const viewModel = new ViewModel(store);
      expect(viewModel.isResetButtonDisabled()).toBe(false);
    });
  });

  describe('handleResetClick', () => {
    it('handleResetClick calls resetFilter and updateFiltersData', () => {
      const store = new CarsStore();
      const spy = spyOn(store, 'updateFiltersData');
      mockResetFilter.mockImplementation(() => {
        return { [Filters.PRICE]: { max: 200000, min: 0 } };
      });
      const viewModel = new ViewModel(store);
      viewModel.handleResetClick();
      expect(mockResetFilter).toBeCalledTimes(1);
      expect(spy).toBeCalledWith({
        [Filters.PRICE]: { max: 200000, min: 0 },
      });
    });
  });
});
