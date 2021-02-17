import {
  Filters,
  FiltersData,
  resetFilter,
  setMiles,
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
    setMiles: jest.fn(),
    resetFilter: jest.fn(),
  };
});
const mockSetMiles = (setMiles as unknown) as jest.Mock<FiltersData>;
const mockResetFilter = (resetFilter as unknown) as jest.Mock<FiltersData>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Miles ViewModel Tests', () => {
  describe('getMaxAndMinInputsValue', () => {
    it('getMaxAndMinInputsValue returns undefined when there is no filtersData', () => {
      const store = new CarsStore();
      store.filtersData = undefined;
      const viewModel = new ViewModel(store);
      expect(viewModel.getMaxAndMinInputsValue()).toBe(undefined);
    });
    it('getMaxAndMinInputsValue returns undefined when there is filtersData but no price filtersData', () => {
      const store = new CarsStore();
      store.filtersData = {};
      const viewModel = new ViewModel(store);
      expect(viewModel.getMaxAndMinInputsValue()).toBe(undefined);
    });
    it('getMaxAndMinInputsValue returns miles filterData when there is miles filterData', () => {
      const store = new CarsStore();
      store.filtersData = { [Filters.MILES]: { max: 120000, min: 15000 } };
      const viewModel = new ViewModel(store);
      expect(viewModel.getMaxAndMinInputsValue()).toEqual({
        max: 120000,
        min: 15000,
      });
    });
  });

  describe('handleInputsDone', () => {
    it('handleInputsDone calls resetFilter and updateFiltersData when no value is passed', () => {
      const store = new CarsStore();
      const spy = spyOn(store, 'updateFiltersData');
      mockResetFilter.mockImplementation(() => {
        return { [Filters.MILES]: { max: 200000, min: 0 } };
      });
      const viewModel = new ViewModel(store);
      viewModel.handleInputsDone(undefined);
      expect(mockResetFilter).toBeCalledTimes(1);
      expect(spy).toBeCalledWith({
        [Filters.MILES]: { max: 200000, min: 0 },
      });
    });
    it('handleInputsDone calls setMiles and updateFiltersData when a value is passed', () => {
      const store = new CarsStore();
      const spy = spyOn(store, 'updateFiltersData');
      mockSetMiles.mockImplementation(() => {
        return { [Filters.MILES]: { max: 100000, min: 2000 } };
      });
      const viewModel = new ViewModel(store);
      viewModel.handleInputsDone({ max: 100000, min: 2000 });
      expect(mockSetMiles).toBeCalledTimes(1);
      expect(spy).toBeCalledWith({
        [Filters.MILES]: { max: 100000, min: 2000 },
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
    it('isResetButtonDisabled returns true when there is filtersData but no miles filtersData', () => {
      const store = new CarsStore();
      store.filtersData = {};
      const viewModel = new ViewModel(store);
      expect(viewModel.isResetButtonDisabled()).toBe(true);
    });
    it('isResetButtonDisabled returns false when there is miles filtersData', () => {
      const store = new CarsStore();
      store.filtersData = { [Filters.MILES]: { max: 200000, min: 0 } };
      const viewModel = new ViewModel(store);
      expect(viewModel.isResetButtonDisabled()).toBe(false);
    });
  });

  describe('handleResetClick', () => {
    it('handleResetClick calls resetFilter and updateFiltersData', () => {
      const store = new CarsStore();
      const spy = spyOn(store, 'updateFiltersData');
      mockResetFilter.mockImplementation(() => {
        return { [Filters.MILES]: { max: 200000, min: 0 } };
      });
      const viewModel = new ViewModel(store);
      viewModel.handleResetClick();
      expect(mockResetFilter).toBeCalledTimes(1);
      expect(spy).toBeCalledWith({
        [Filters.MILES]: { max: 200000, min: 0 },
      });
    });
  });
});
