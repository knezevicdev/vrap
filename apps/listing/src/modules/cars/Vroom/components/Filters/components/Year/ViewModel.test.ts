import { resetFilter, setYear } from '@vroom-web/catalog-url-integration';

import ViewModel from './ViewModel';

import { CarsStore } from 'src/modules/cars/store';

jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

jest.mock('@vroom-web/catalog-url-integration');

const mockSetYear = (setYear as unknown) as jest.Mock;
const mockResetFilter = (resetFilter as unknown) as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Year Filter ViewModel Tests', () => {
  it('constructor sets the carStore and errorLabel', () => {
    const store = new CarsStore();
    const viewModel = new ViewModel(store);
    expect(viewModel.carsStore).toEqual(store);
    expect(viewModel.errorLabel).toBe(
      `Please enter a range of years within 2000-${new Date().getFullYear()}`
    );
  });

  it('getMaxAndMinInputsValue returns undefined when there is no filterData', () => {
    const store = new CarsStore();
    const viewModel = new ViewModel(store);
    store.filtersData = undefined;
    expect(viewModel.getMaxAndMinInputsValue()).toBe(undefined);
  });

  it('getMaxAndMinInputsValue returns filtersDataYear when there is filterData', () => {
    const store = new CarsStore();
    const viewModel = new ViewModel(store);
    store.filtersData = {
      year: {
        min: 2000,
        max: 2016,
      },
    };
    expect(viewModel.getMaxAndMinInputsValue()).toEqual({
      min: 2000,
      max: 2016,
    });
  });

  it('handleMaxAndMinInputsChange calls setYear and updateFiltersData when a value is passed', () => {
    const store = new CarsStore();
    const viewModel = new ViewModel(store);
    mockSetYear.mockReturnValue('setYear mock');
    mockResetFilter.mockReturnValue('resetFilter mock');
    const updateFilterDataSpy = jest.spyOn(store, 'updateFiltersData');
    viewModel.handleMaxAndMinInputsChange({ min: 2012, max: 2015 });
    expect(setYear).toHaveBeenCalledTimes(1);
    expect(resetFilter).toHaveBeenCalledTimes(0);
    expect(updateFilterDataSpy).toHaveBeenCalledWith('setYear mock');
  });

  it('handleMaxAndMinInputsChange calls resetFilter and updateFiltersData when no value is passed', () => {
    const store = new CarsStore();
    const viewModel = new ViewModel(store);
    mockSetYear.mockReturnValue('setYear mock');
    mockResetFilter.mockReturnValue('resetFilter mock');
    const updateFilterDataSpy = jest.spyOn(store, 'updateFiltersData');
    viewModel.handleMaxAndMinInputsChange();
    expect(setYear).toHaveBeenCalledTimes(0);
    expect(resetFilter).toHaveBeenCalledTimes(1);
    expect(updateFilterDataSpy).toHaveBeenCalledWith('resetFilter mock');
  });

  it('isResetButtonDisabled returns true when there is no filtersData', () => {
    const store = new CarsStore();
    const viewModel = new ViewModel(store);
    store.filtersData = undefined;
    expect(viewModel.isResetButtonDisabled()).toBe(true);
  });

  it('isResetButtonDisabled returns true when there is filtersData but no year object', () => {
    const store = new CarsStore();
    const viewModel = new ViewModel(store);
    store.filtersData = {
      miles: {
        max: 120000,
        min: 100,
      },
    };
    expect(viewModel.isResetButtonDisabled()).toBe(true);
  });

  it('isResetButtonDisabled returns false when there is filtersData with year data in it', () => {
    const store = new CarsStore();
    const viewModel = new ViewModel(store);
    store.filtersData = {
      miles: {
        max: 120000,
        min: 100,
      },
      year: {
        min: 2000,
        max: 2016,
      },
    };
    expect(viewModel.isResetButtonDisabled()).toBe(false);
  });

  it('handleResetClick calls resetFilter and updateFiltersData', () => {
    const store = new CarsStore();
    const viewModel = new ViewModel(store);
    mockResetFilter.mockReturnValue('resetFilter mock');
    const updateFilterDataSpy = jest.spyOn(store, 'updateFiltersData');
    viewModel.handleResetClick();
    expect(resetFilter).toHaveBeenCalledTimes(1);
    expect(updateFilterDataSpy).toHaveBeenCalledWith('resetFilter mock');
  });
});
