import ViewModel from './ViewModel';

import { CarsStore } from 'src/modules/cars/store';

describe('Cars ViewModel Tests', () => {
  describe('getPage', () => {
    test('page 1', () => {
      const mockStore = {};
      const viewModel = new ViewModel(mockStore as CarsStore);
      expect(viewModel.getPage()).toEqual(1);
    });
    test('page 5', () => {
      const mockStore = {
        filtersData: {
          page: 5,
        },
      };
      const viewModel = new ViewModel(mockStore as CarsStore);
      expect(viewModel.getPage()).toEqual(5);
    });

    test('page 400', () => {
      const mockStore = {
        filtersData: {
          page: 400,
        },
      };
      const viewModel = new ViewModel(mockStore as CarsStore);
      expect(viewModel.getPage()).toEqual(400);
    });
  });

  describe('getStartingCountByPage', () => {
    const invCountStore = {
      inventoryCardsPerPage: 24,
    };
    test('page 1', () => {
      const mockStore = {
        ...invCountStore,
      };
      const viewModel = new ViewModel(mockStore as CarsStore);
      expect(viewModel.getStartingCountByPage()).toEqual(1);
    });
    test('page 5', () => {
      const mockStore = {
        ...invCountStore,
        filtersData: {
          page: 5,
        },
      };
      const viewModel = new ViewModel(mockStore as CarsStore);
      expect(viewModel.getStartingCountByPage()).toEqual(97);
    });

    test('page 400', () => {
      const mockStore = {
        ...invCountStore,
        filtersData: {
          page: 400,
        },
      };
      const viewModel = new ViewModel(mockStore as CarsStore);
      expect(viewModel.getStartingCountByPage()).toEqual(9577);
    });
  });
});
