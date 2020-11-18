import { DriveType, Filters } from '@vroom-web/catalog-url-integration';

import ViewModel from './ViewModel';

import { CarsStore } from 'src/modules/cars/store';

jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

describe('Fuel Efficiency View Model', () => {
  let carStore: CarsStore;
  let viewModel: ViewModel;

  beforeEach(() => {
    carStore = new CarsStore();
    viewModel = new ViewModel(carStore);
  });

  describe('getMaxAndMinInputsValue', () => {
    it('should return undefined if the filters data is undefined', () => {
      carStore.filtersData = undefined;
      expect(viewModel.getMaxAndMinInputsValue()).toEqual(undefined);
    });
    it('should return undefined if the filters data exists but not fuel efficiency', () => {
      carStore.filtersData = {
        [Filters.DRIVE_TYPE]: [DriveType.AWD],
      };
      expect(viewModel.getMaxAndMinInputsValue()).toEqual(undefined);
    });
    it('should return the min and max based on the filters data', () => {
      carStore.filtersData = {
        [Filters.FUEL_EFFICIENCY]: { min: 10 },
      };
      expect(viewModel.getMaxAndMinInputsValue()).toEqual({ min: 10, max: 60 });
    });
  });

  describe('updateFiltersDataFuelEfficiency', () => {
    it('should reset filters if value is undefined', () => {
      carStore.updateFiltersData = jest.fn();
      carStore.filtersData = {
        [Filters.FUEL_EFFICIENCY]: { min: 10 },
      };
      viewModel.updateFiltersDataFuelEfficiency(undefined);
      expect(carStore.updateFiltersData).toHaveBeenCalledTimes(1);
      expect(carStore.updateFiltersData).toHaveBeenCalledWith({
        [Filters.FUEL_EFFICIENCY]: undefined,
      });
    });
    it('should set the fuel efficiency if value is defined', () => {
      carStore.updateFiltersData = jest.fn();
      carStore.filtersData = {
        [Filters.FUEL_EFFICIENCY]: { min: 100 },
      };
      viewModel.updateFiltersDataFuelEfficiency({ min: 10 });
      expect(carStore.updateFiltersData).toHaveBeenCalledTimes(1);
      expect(carStore.updateFiltersData).toHaveBeenCalledWith({
        [Filters.FUEL_EFFICIENCY]: { min: 10 },
      });
    });
  });

  describe('handleSliderDone', () => {
    it('should call the updateFiltersDataFuelEfficiency with the value', () => {
      viewModel.updateFiltersDataFuelEfficiency = jest.fn();
      viewModel.handleSliderDone(
        viewModel.updateFiltersDataFuelEfficiency,
        undefined
      );
      expect(viewModel.updateFiltersDataFuelEfficiency).toHaveBeenCalledTimes(
        1
      );
      expect(viewModel.updateFiltersDataFuelEfficiency).toHaveBeenCalledWith(
        undefined
      );
    });
  });
});
