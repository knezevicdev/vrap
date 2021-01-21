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

    describe('the reset button should be enabled', () => {
      const four = {
        [Filters.CYLINDERS]: [Cylinder.FOUR],
      };
      const eight = {
        [Filters.CYLINDERS]: [Cylinder.EIGHT],
      };
      const otherFalse = {
        [Filters.OTHER_CYLINDERS]: false,
      };
      it('should be enabled if four is clicked', () => {
        store.filtersData = four;
        const resetDisabled = viewModel.isResetButtonDisabled();
        expect(resetDisabled).toBe(false);
      });
      it('should be enabled if four and eight is clicked', () => {
        store.filtersData = {
          ...four,
          ...eight,
        };
        const resetDisabled = viewModel.isResetButtonDisabled();
        expect(resetDisabled).toBe(false);
      });
      it('should be enabled if four and eight is clicked but other is not', () => {
        store.filtersData = {
          ...four,
          ...eight,
          ...otherFalse,
        };
        const resetDisabled = viewModel.isResetButtonDisabled();
        expect(resetDisabled).toBe(false);
      });
    });
  });
});
