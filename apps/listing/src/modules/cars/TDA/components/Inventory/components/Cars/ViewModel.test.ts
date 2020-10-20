import ViewModel from './ViewModel';
jest.mock('src/integrations/AnalyticsHandler');

import { CarsStore } from 'src/modules/cars/store';

describe('getPage', () => {
  const invCountStore = {
    inventoryCardsPerPage: 24,
  };
  test('page 1', () => {
    const mockStore = {
      ...invCountStore,
    };
    const viewModel = new ViewModel(mockStore as CarsStore);
    expect(viewModel.getPage()).toEqual(1);
  });
  test('page 5', () => {
    const mockStore = {
      ...invCountStore,
      filtersData: {
        page: 5,
      },
    };
    const viewModel = new ViewModel(mockStore as CarsStore);
    expect(viewModel.getPage()).toEqual(97);
  });

  test('page 400', () => {
    const mockStore = {
      ...invCountStore,
      filtersData: {
        page: 400,
      },
    };
    const viewModel = new ViewModel(mockStore as CarsStore);
    expect(viewModel.getPage()).toEqual(9577);
  });
});
