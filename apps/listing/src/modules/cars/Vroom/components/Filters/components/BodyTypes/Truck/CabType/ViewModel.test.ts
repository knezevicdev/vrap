import {
  CabType as FiltersDataCabType,
  Filters,
} from '@vroom-web/catalog-url-integration';

import ViewModel from './ViewModel';

import { CabTypeAPI, CabTypeDisplay } from 'src/modules/cars/data';
import { CarsStore } from 'src/modules/cars/store';

jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

describe('CabType ViewModel', () => {
  let store: CarsStore;
  let viewModel: ViewModel;

  beforeEach(() => {
    store = new CarsStore();
    viewModel = new ViewModel(store);
  });

  const arbitraryCabTypeValue = {
    api: CabTypeAPI.CREW,
    display: CabTypeDisplay.CREW,
    filtersDataValue: FiltersDataCabType.CREW,
  };

  describe('isChecked()', () => {
    it('should return false if no filterData exists', () => {
      store.filtersData = {};
      const receivedState = viewModel.isChecked(arbitraryCabTypeValue);
      expect(receivedState).toBe(false);
    });
    it('should return false if filterData does not include cabType', () => {
      store.filtersData = { [Filters.CAB_TYPE]: [FiltersDataCabType.EXTENDED] };
      const receivedState = viewModel.isChecked(arbitraryCabTypeValue);
      expect(receivedState).toBe(false);
    });
    it('should return true if filterData exists and includes CREW cabType', () => {
      store.filtersData = { [Filters.CAB_TYPE]: [FiltersDataCabType.CREW] };
      const receivedState = viewModel.isChecked(arbitraryCabTypeValue);
      expect(receivedState).toBe(true);
    });
  });

  describe('handleCheckboxChange()', () => {
    const newStore = new CarsStore();
    it('should add CREW cabType to filter data', () => {
      newStore.updateFiltersData = jest.fn();
      const testViewModel = new ViewModel(newStore);
      testViewModel.handleCheckboxChange(FiltersDataCabType.CREW, true);
      const expectedValue = { cabtype: ['crew'] };
      expect(newStore.updateFiltersData).toBeCalledTimes(1);
      expect(newStore.updateFiltersData).toBeCalledWith(expectedValue);
    });
    it('should remove CREW cabType to filter data', () => {
      newStore.updateFiltersData = jest.fn();
      newStore.filtersData = { [Filters.CAB_TYPE]: [FiltersDataCabType.CREW] };
      const testViewModel = new ViewModel(newStore);
      testViewModel.handleCheckboxChange(FiltersDataCabType.CREW, false);
      const expectedValue = { cabtype: undefined };
      expect(newStore.updateFiltersData).toBeCalledTimes(1);
      expect(newStore.updateFiltersData).toBeCalledWith(expectedValue);
    });
  });
});
