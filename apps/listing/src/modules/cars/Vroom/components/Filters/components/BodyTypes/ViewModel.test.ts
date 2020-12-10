import { BodyType, CabType, Filters } from '@vroom-web/catalog-url-integration';

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
      const mockBodyTypeValue = {
        [Filters.BODY_TYPES]: [BodyType.CONVERTIBLE],
      };

      it('should be enabled body types filter has value', () => {
        store.filtersData = mockBodyTypeValue;
        const resetDisabled = viewModel.isResetDisabled();
        expect(resetDisabled).toBe(false);
      });
    });
  });

  describe('reset()', () => {
    const mockFiltersData = {
      [Filters.BODY_TYPES]: [BodyType.TRUCK],
      [Filters.CAB_TYPE]: [CabType.CREW, CabType.EXTENDED],
    };
    const mockUpdateFiltersData = jest.fn(
      (updatedBodyTypeData) => (store.filtersData = updatedBodyTypeData)
    );
    it('should reset cabType and bodyType filters', () => {
      store.updateFiltersData = mockUpdateFiltersData;
      store.filtersData = mockFiltersData;
      const expectedState = {
        [Filters.BODY_TYPES]: undefined,
      };
      viewModel.reset();
      expect(store.filtersData).toEqual(expectedState);
      expect(store.filtersData.cabtype).toEqual(undefined);
    });
  });
});
