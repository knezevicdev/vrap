import {
  Filters,
  PopularFeatures as FiltersDataPopularFeatures,
} from '@vroom-web/catalog-url-integration';

import ViewModel from './ViewModel';

import { popularFeatures } from 'src/modules/cars/data';
import { CarsStore } from 'src/modules/cars/store';

jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

describe('Features ViewModel', () => {
  let store: CarsStore;
  let viewModel: ViewModel;
  beforeEach(() => {
    store = new CarsStore();
    viewModel = new ViewModel(store);
  });

  describe('getPopularFeatures', () => {
    it('returns features', () => {
      const filters = viewModel.getPopularFeatures();
      expect(filters).toEqual(popularFeatures);
    });
  });

  describe('isChecked', () => {
    it('returns true if an item is', () => {
      const checkedArray: string[] = [];
      viewModel.getPopularFeatures().map((feature) => {
        const checked = viewModel.isChecked(feature);
        checkedArray.push(checked ? 'true' : 'false');
      });
      expect(checkedArray.includes('true')).toBe(false);
    });
    it('returns true if an item is', () => {
      const checkedArray: string[] = [];
      const androidAuto = {
        [Filters.POPULAR_FEATURES]: [FiltersDataPopularFeatures.ANDROID_AUTO],
      };
      store.filtersData = androidAuto;
      viewModel.getPopularFeatures().map((feature) => {
        const checked = viewModel.isChecked(feature);
        checkedArray.push(checked ? 'true' : 'false');
      });
      expect(checkedArray.includes('true')).toBe(true);
    });
  });

  describe('isResetButtonDisabled', () => {
    it('should be disabled if no filters are active', () => {
      const resetDisabled = viewModel.isResetButtonDisabled();
      expect(resetDisabled).toBe(true);
    });

    describe('the reset button should be enabled', () => {
      const androidAuto = {
        [Filters.POPULAR_FEATURES]: [FiltersDataPopularFeatures.ANDROID_AUTO],
      };
      const heatedSeats = {
        [Filters.POPULAR_FEATURES]: [FiltersDataPopularFeatures.HEATED_SEATS],
      };
      it('should be enabled if android auto', () => {
        store.filtersData = androidAuto;
        const resetDisabled = viewModel.isResetButtonDisabled();
        expect(resetDisabled).toBe(false);
      });
      it('should be enabled if four and eight is clicked', () => {
        store.filtersData = {
          ...androidAuto,
          ...heatedSeats,
        };
        const resetDisabled = viewModel.isResetButtonDisabled();
        expect(resetDisabled).toBe(false);
      });
    });
  });
});
