import {
  addAllModels,
  addBodyType,
  addModel,
  Filters,
  FiltersData,
  setSearch,
} from '@vroom-web/catalog-url-integration';

import { AutocompleteStore } from './store';
import ViewModel from './ViewModel';

import { CarsStore } from 'src/modules/cars/store';
import { Status } from 'src/networking/types';

jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

jest.mock('@vroom-web/catalog-url-integration', () => {
  const actualImport = jest.requireActual('@vroom-web/catalog-url-integration');
  return {
    ...actualImport,
    addBodyType: jest.fn(),
    addAllModels: jest.fn(),
    addModel: jest.fn(),
    setSearch: jest.fn(),
  };
});
const mockAddBodyType = (addBodyType as unknown) as jest.Mock<FiltersData>;
const mockAddAllModels = (addAllModels as unknown) as jest.Mock<FiltersData>;
const mockAddModel = (addModel as unknown) as jest.Mock<FiltersData>;
const mockSetSearch = (setSearch as unknown) as jest.Mock<FiltersData>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Autocomplete ViewModel Tests', () => {
  describe('inputValue', () => {
    it('inputValue returns autoCompleteStore.inputValue', () => {
      const carStore = new CarsStore();
      const autoCompleteStore = new AutocompleteStore();
      const value = 'some value';
      autoCompleteStore.inputValue = value;
      const viewModel = new ViewModel(carStore, autoCompleteStore);
      expect(viewModel.inputValue()).toBe(value);
    });
  });

  describe('setInputValue', () => {
    it('setInputValue calls autoCompleteStore.setInputValue with passed in value', () => {
      const carStore = new CarsStore();
      const autoCompleteStore = new AutocompleteStore();
      const value = 'another value';
      const spy = spyOn(autoCompleteStore, 'setInputValue');
      const viewModel = new ViewModel(carStore, autoCompleteStore);
      viewModel.setInputValue(value);
      expect(spy).toHaveBeenCalledWith(value);
    });
  });

  describe('suggestionsLoading', () => {
    it('suggestionsLoading returns true when inventorySuggestionsStatus is fetching', () => {
      const carStore = new CarsStore();
      const autoCompleteStore = new AutocompleteStore();
      autoCompleteStore.inventorySuggestionsStatus = Status.FETCHING;
      const viewModel = new ViewModel(carStore, autoCompleteStore);
      expect(viewModel.suggestionsLoading()).toBe(true);
    });
    it('suggestionsLoading returns false when inventorySuggestionsStatus is anything but fetching', () => {
      const carStore = new CarsStore();
      const autoCompleteStore = new AutocompleteStore();
      autoCompleteStore.inventorySuggestionsStatus = Status.SUCCESS;
      const viewModel = new ViewModel(carStore, autoCompleteStore);
      expect(viewModel.suggestionsLoading()).toBe(false);
    });
  });

  describe('suggestions', () => {
    it('suggestions returns empty array when suggestionsLoading is true', () => {
      const carStore = new CarsStore();
      const autoCompleteStore = new AutocompleteStore();
      autoCompleteStore.inventorySuggestionsStatus = Status.FETCHING;
      const viewModel = new ViewModel(carStore, autoCompleteStore);
      expect(viewModel.suggestions()).toEqual([]);
    });
    it('suggestions returns empty array when inventorySuggestions is undefined', () => {
      const carStore = new CarsStore();
      const autoCompleteStore = new AutocompleteStore();
      autoCompleteStore.inventorySuggestionsStatus = Status.SUCCESS;
      autoCompleteStore.inventorySuggestions = undefined;
      const viewModel = new ViewModel(carStore, autoCompleteStore);
      expect(viewModel.suggestions()).toEqual([]);
    });
    it('suggestions returns an array of suggestions when inventorySuggestions exists', () => {
      const carStore = new CarsStore();
      const autoCompleteStore = new AutocompleteStore();
      autoCompleteStore.inventorySuggestionsStatus = Status.SUCCESS;
      autoCompleteStore.inventorySuggestions = {
        BodyType: [],
        Make: ['Tesla'],
        Model: ['Tesla#Model 3', 'Tesla#Model S'],
      };
      const viewModel = new ViewModel(carStore, autoCompleteStore);
      expect(viewModel.suggestions()).toEqual([
        {
          group: 'Make',
          label: 'Tesla',
          make: 'Tesla',
        },
        {
          group: 'Model',
          label: 'Tesla Model 3',
          make: 'Tesla',
          model: 'Model 3',
        },
        {
          group: 'Model',
          label: 'Tesla Model S',
          make: 'Tesla',
          model: 'Model S',
        },
      ]);
    });
  });

  describe('navigateUsingAutocomplete', () => {
    it('navigateUsingAutocomplete does nothing when the suggestion.bodyType has no value', () => {
      const carStore = new CarsStore();
      const autoCompleteStore = new AutocompleteStore();
      const spy = spyOn(carStore, 'updateFiltersData');
      mockAddBodyType.mockImplementation(() => {
        return { [Filters.BODY_TYPES]: [] };
      });
      const viewModel = new ViewModel(carStore, autoCompleteStore);
      viewModel.navigateUsingAutocomplete({
        bodyType: undefined,
        group: 'Body Type',
        label: 'SUV',
      });
      expect(mockAddBodyType).toHaveBeenCalledTimes(0);
      expect(spy).toHaveBeenCalledTimes(0);
    });
    it('navigateUsingAutocomplete does nothing when the suggestion.bodyType does not match a body type in the car store', () => {
      const carStore = new CarsStore();
      const autoCompleteStore = new AutocompleteStore();
      const spy = spyOn(carStore, 'updateFiltersData');
      mockAddBodyType.mockImplementation(() => {
        return { [Filters.BODY_TYPES]: [] };
      });
      const viewModel = new ViewModel(carStore, autoCompleteStore);
      viewModel.navigateUsingAutocomplete({
        bodyType: 'Not SUV',
        group: 'Body Type',
        label: 'SUV',
      });
      expect(mockAddBodyType).toHaveBeenCalledTimes(0);
      expect(spy).toHaveBeenCalledTimes(0);
    });
    it('navigateUsingAutocomplete calls addBodyType and updateFiltersData when suggestion is Body Type and a match is found', () => {
      const carStore = new CarsStore();
      const autoCompleteStore = new AutocompleteStore();
      const spy = spyOn(carStore, 'updateFiltersData');
      mockAddBodyType.mockImplementation(() => {
        return { [Filters.BODY_TYPES]: [] };
      });
      const viewModel = new ViewModel(carStore, autoCompleteStore);
      viewModel.navigateUsingAutocomplete({
        bodyType: 'SUV',
        group: 'Body Type',
        label: 'SUV',
      });
      expect(mockAddBodyType).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ [Filters.BODY_TYPES]: [] });
    });
    it('navigateUsingAutocomplete does nothing when the suggestion.make has no value', () => {
      const carStore = new CarsStore();
      const autoCompleteStore = new AutocompleteStore();
      const spy = spyOn(carStore, 'updateFiltersData');
      mockAddAllModels.mockImplementation(() => {
        return { [Filters.MAKE_AND_MODELS]: [] };
      });
      const viewModel = new ViewModel(carStore, autoCompleteStore);
      viewModel.navigateUsingAutocomplete({
        group: 'Make',
        label: 'Tesla',
        make: undefined,
      });
      expect(mockAddAllModels).toHaveBeenCalledTimes(0);
      expect(spy).toHaveBeenCalledTimes(0);
    });
    it('navigateUsingAutocomplete calls addAllModels and updateFiltersData when group is Make and make has a value', () => {
      const carStore = new CarsStore();
      const autoCompleteStore = new AutocompleteStore();
      const spy = spyOn(carStore, 'updateFiltersData');
      mockAddAllModels.mockImplementation(() => {
        return { [Filters.MAKE_AND_MODELS]: [] };
      });
      const viewModel = new ViewModel(carStore, autoCompleteStore);
      viewModel.navigateUsingAutocomplete({
        group: 'Make',
        label: 'Tesla',
        make: 'Tesla',
      });
      expect(mockAddAllModels).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ [Filters.MAKE_AND_MODELS]: [] });
    });
    it('navigateUsingAutocomplete does nothing when does not have a make', () => {
      const carStore = new CarsStore();
      const autoCompleteStore = new AutocompleteStore();
      const spy = spyOn(carStore, 'updateFiltersData');
      mockAddModel.mockImplementation(() => {
        return { [Filters.MAKE_AND_MODELS]: [] };
      });
      const viewModel = new ViewModel(carStore, autoCompleteStore);
      viewModel.navigateUsingAutocomplete({
        group: 'Model',
        label: 'Tesla Model S',
        make: undefined,
        model: 'Model S',
      });
      expect(mockAddModel).toHaveBeenCalledTimes(0);
      expect(spy).toHaveBeenCalledTimes(0);
    });
    it('navigateUsingAutocomplete does nothing when does not have a model', () => {
      const carStore = new CarsStore();
      const autoCompleteStore = new AutocompleteStore();
      const spy = spyOn(carStore, 'updateFiltersData');
      mockAddModel.mockImplementation(() => {
        return { [Filters.MAKE_AND_MODELS]: [] };
      });
      const viewModel = new ViewModel(carStore, autoCompleteStore);
      viewModel.navigateUsingAutocomplete({
        group: 'Model',
        label: 'Tesla Model S',
        make: 'Tesla',
        model: undefined,
      });
      expect(mockAddModel).toHaveBeenCalledTimes(0);
      expect(spy).toHaveBeenCalledTimes(0);
    });
    it('navigateUsingAutocomplete calls addModel and updateFiltersData when group is Model and a make and model exist', () => {
      const carStore = new CarsStore();
      const autoCompleteStore = new AutocompleteStore();
      const spy = spyOn(carStore, 'updateFiltersData');
      mockAddModel.mockImplementation(() => {
        return { [Filters.MAKE_AND_MODELS]: [] };
      });
      const viewModel = new ViewModel(carStore, autoCompleteStore);
      viewModel.navigateUsingAutocomplete({
        group: 'Model',
        label: 'Tesla Model S',
        make: 'Tesla',
        model: 'Model S',
      });
      expect(mockAddModel).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ [Filters.MAKE_AND_MODELS]: [] });
    });
  });

  describe('navigateUsingSearch', () => {
    it('navigateUsingSearch calls setSearch and updateFiltersData', () => {
      const carStore = new CarsStore();
      const autoCompleteStore = new AutocompleteStore();
      const spy = spyOn(carStore, 'updateFiltersData');
      mockSetSearch.mockImplementation(() => {
        return { [Filters.SEARCH]: 'my search' };
      });
      const viewModel = new ViewModel(carStore, autoCompleteStore);
      viewModel.navigateUsingSearch();
      expect(mockSetSearch).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ [Filters.SEARCH]: 'my search' });
    });
  });
});
