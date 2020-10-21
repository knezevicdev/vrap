import { Cylinder, Filters } from '@vroom-web/catalog-url-integration';

import ViewModel from './ViewModel';

import { CarsStore } from 'src/modules/cars/store';

jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});
describe('Engine and Drivetrain ViewModel', () => {
  let store: CarsStore;
  let viewModel: ViewModel;

  beforeEach(() => {
    store = new CarsStore();
    viewModel = new ViewModel(store);
  });

  describe('isResetButtonDisabled', () => {
    it('should be disabled if no filters are active', () => {
      const resetDisabled = viewModel.isResetButtonDisabled();
      expect(resetDisabled).toBe(true);
    });

    it('should be enabled if cylinders are checked', () => {
      const cylindersFilters = {
        [Filters.CYLINDERS]: [Cylinder.FOUR],
      };
      store.filtersData = cylindersFilters;
      const resetDisabled = viewModel.isResetButtonDisabled();
      expect(resetDisabled).toBe(false);
    });
  });
});
