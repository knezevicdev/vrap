import { BodyType, Filters } from '@vroom-web/catalog-url-integration';

import ViewModel from './ViewModel';

import { CarsStore } from 'src/modules/cars/store';

jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

describe('BodyType ViewModel', () => {
  let store: CarsStore;
  let viewModel: ViewModel;

  beforeEach(() => {
    store = new CarsStore();
    viewModel = new ViewModel(store);
  });

  describe('isResetDisabled()', () => {
    it('should be disabled if no filters are active', () => {
      const resetDisabled = viewModel.isResetDisabled();
      expect(resetDisabled).toBe(true);
    });

    describe('the reset button should be enabled', () => {
      const arbitraryBodyTypeValue = {
        [Filters.BODY_TYPES]: [BodyType.CONVERTIBLE],
      };

      it('should be enabled body types filter has value', () => {
        store.filtersData = arbitraryBodyTypeValue;
        const resetDisabled = viewModel.isResetDisabled();
        expect(resetDisabled).toBe(false);
      });
    });
  });
});
