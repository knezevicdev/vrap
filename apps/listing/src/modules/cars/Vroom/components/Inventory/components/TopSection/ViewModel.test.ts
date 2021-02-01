import ViewModel from './ViewModel';

import { CarsStore } from 'src/modules/cars/store';

jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

describe('TopSection ViewModel Tests', () => {
  describe('areFiltersClosed', () => {
    it('areFiltersClosed returns true when areFiltersOpen is false', () => {
      const store = new CarsStore();
      store.areFiltersOpen = false;
      const viewModel = new ViewModel(store);
      expect(viewModel.areFiltersClosed()).toBe(true);
    });
    it('areFiltersClosed returns false when areFiltersOpen is true', () => {
      const store = new CarsStore();
      store.areFiltersOpen = true;
      const viewModel = new ViewModel(store);
      expect(viewModel.areFiltersClosed()).toBe(false);
    });
  });

  describe('toggleAreFiltersClosed', () => {
    it('toggleAreFiltersClosed calls store.toggleAreFiltersOpen', () => {
      const store = new CarsStore();
      const spy = jest.spyOn(store, 'toggleAreFiltersOpen');
      const viewModel = new ViewModel(store);
      viewModel.toggleAreFiltersClosed();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
