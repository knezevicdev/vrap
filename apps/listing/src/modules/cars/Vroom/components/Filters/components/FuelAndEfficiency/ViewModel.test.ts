import {
  DriveType,
  Filters,
  FuelType,
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

describe('Fuel And Efficiency View Model', () => {
  let carStore: CarsStore;
  let viewModel: ViewModel;

  beforeEach(() => {
    carStore = new CarsStore();
    viewModel = new ViewModel(carStore);
  });

  describe('isResetButtonDisabled', () => {
    it('should be true if filters data is undefined', () => {
      carStore.filtersData = undefined;
      const disabled = viewModel.isResetButtonDisabled();
      expect(disabled).toEqual(true);
    });
    it('should be true if the filters exist but the fuel type does not', () => {
      carStore.filtersData = {
        [Filters.DRIVE_TYPE]: [DriveType.AWD],
      };
      const disabled = viewModel.isResetButtonDisabled();
      expect(disabled).toEqual(true);
    });
    it('should be false if the filters exist and the fuel type is there', () => {
      carStore.filtersData = {
        [Filters.FUEL_TYPE]: [FuelType.GAS_ELECTRIC_HYBRID],
      };
      const disabled = viewModel.isResetButtonDisabled();
      expect(disabled).toEqual(false);
    });

    it('should be false if the filters exist and the fuel efficiency is there', () => {
      carStore.filtersData = {
        [Filters.FUEL_EFFICIENCY]: { min: 10 },
      };
      const disabled = viewModel.isResetButtonDisabled();
      expect(disabled).toEqual(false);
    });
  });
});
