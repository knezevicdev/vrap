import { Variant } from './index';
import Store from './store';
import ViewModel from './ViewModel';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('MaxAndMinInputs ViewModel Tests', () => {
  describe('hasInputError', () => {
    it('hasInputError returns store.hasInputError value', () => {
      const onChange = (): void => {
        return;
      };
      const range = { max: 2020, min: 2000 };
      const value = { max: 2016, min: 2012 };
      const variant = Variant.MAX_AND_MIN;
      const store = new Store({ onChange, range, value, variant });
      store.hasInputError = true;
      const viewModel = new ViewModel({
        maxInputPlaceholder: '2020',
        maxOnlyInputLabel: undefined,
        minInputPlaceholder: '2000',
        inputErrorLabel: 'Please enter a range of years within 2000-2020',
        inputStartAdornment: undefined,
        range,
        step: 1,
        store,
        variant,
        showInput: true,
      });
      expect(viewModel.hasInputError()).toBe(true);
    });
  });

  describe('getMinInputValue', () => {
    it('getMinInputValue returns store.minInputValue value', () => {
      const onChange = (): void => {
        return;
      };
      const range = { max: 2020, min: 2000 };
      const value = { max: 2016, min: 2012 };
      const variant = Variant.MAX_AND_MIN;
      const store = new Store({ onChange, range, value, variant });
      store.minInputValue = '2001';
      const viewModel = new ViewModel({
        maxInputPlaceholder: '2020',
        maxOnlyInputLabel: undefined,
        minInputPlaceholder: '2000',
        inputErrorLabel: 'Please enter a range of years within 2000-2020',
        inputStartAdornment: undefined,
        range,
        step: 1,
        store,
        variant,
        showInput: true,
      });
      expect(viewModel.getMinInputValue()).toBe('2001');
    });
  });

  describe('getSliderValue', () => {
    it('getSliderValue returns store.maxSliderValue when variant is MAX_ONLY', () => {
      const onChange = (): void => {
        return;
      };
      const range = { max: 2020, min: 2000 };
      const value = { max: 2016, min: 2012 };
      const variant = Variant.MAX_ONLY;
      const store = new Store({ onChange, range, value, variant });
      const viewModel = new ViewModel({
        maxInputPlaceholder: '2020',
        maxOnlyInputLabel: undefined,
        minInputPlaceholder: '2000',
        inputErrorLabel: 'Please enter a range of years within 2000-2020',
        inputStartAdornment: undefined,
        range,
        step: 1,
        store,
        variant,
        showInput: true,
      });
      expect(viewModel.getSliderValue()).toBe(2016);
    });
    it('getSliderValue returns store.minSliderValue when variant is MIN_ONLY', () => {
      const onChange = (): void => {
        return;
      };
      const range = { max: 2020, min: 2000 };
      const value = { max: 2016, min: 2012 };
      const variant = Variant.MIN_ONLY;
      const store = new Store({ onChange, range, value, variant });
      const viewModel = new ViewModel({
        maxInputPlaceholder: '2020',
        maxOnlyInputLabel: undefined,
        minInputPlaceholder: '2000',
        inputErrorLabel: 'Please enter a range of years within 2000-2020',
        inputStartAdornment: undefined,
        range,
        step: 1,
        store,
        variant,
        showInput: true,
      });
      expect(viewModel.getSliderValue()).toBe(2012);
    });
    it('getSliderValue returns store.maxSliderValue and store.minSliderValue when variant is MAX_AND_MIN', () => {
      const onChange = (): void => {
        return;
      };
      const range = { max: 2020, min: 2000 };
      const value = { max: 2016, min: 2012 };
      const variant = Variant.MAX_AND_MIN;
      const store = new Store({ onChange, range, value, variant });
      const viewModel = new ViewModel({
        maxInputPlaceholder: '2020',
        maxOnlyInputLabel: undefined,
        minInputPlaceholder: '2000',
        inputErrorLabel: 'Please enter a range of years within 2000-2020',
        inputStartAdornment: undefined,
        range,
        step: 1,
        store,
        variant,
        showInput: true,
      });
      expect(viewModel.getSliderValue()).toEqual([2012, 2016]);
    });
  });

  describe('handleMinInputChange', () => {
    it('handleMinInputChange calls store.setMinInputValue', () => {
      const onChange = (): void => {
        return;
      };
      const range = { max: 2020, min: 2000 };
      const value = { max: 2016, min: 2012 };
      const variant = Variant.MAX_AND_MIN;
      const store = new Store({ onChange, range, value, variant });
      const spy = spyOn(store, 'setMinInputValue');
      const viewModel = new ViewModel({
        maxInputPlaceholder: '2020',
        maxOnlyInputLabel: undefined,
        minInputPlaceholder: '2000',
        inputErrorLabel: 'Please enter a range of years within 2000-2020',
        inputStartAdornment: undefined,
        range,
        step: 1,
        store,
        variant,
        showInput: true,
      });
      viewModel.handleMinInputChange('2014');
      expect(spy).toHaveBeenCalledWith('2014');
    });
  });

  describe('handleMaxInputChange', () => {
    it('handleMaxInputChange calls store.setMaxInputValue', () => {
      const onChange = (): void => {
        return;
      };
      const range = { max: 2020, min: 2000 };
      const value = { max: 2016, min: 2012 };
      const variant = Variant.MAX_AND_MIN;
      const store = new Store({ onChange, range, value, variant });
      const spy = spyOn(store, 'setMaxInputValue');
      const viewModel = new ViewModel({
        maxInputPlaceholder: '2020',
        maxOnlyInputLabel: undefined,
        minInputPlaceholder: '2000',
        inputErrorLabel: 'Please enter a range of years within 2000-2020',
        inputStartAdornment: undefined,
        range,
        step: 1,
        store,
        variant,
        showInput: true,
      });
      viewModel.handleMaxInputChange('2017');
      expect(spy).toHaveBeenCalledWith('2017');
    });
  });

  describe('handleSliderChange', () => {
    it('handleSliderChange calls setMaxSliderValue when variant is MAX_ONLY', () => {
      const onChange = (): void => {
        return;
      };
      const range = { max: 2020, min: 2000 };
      const value = { max: 2016, min: 2012 };
      const variant = Variant.MAX_ONLY;
      const store = new Store({ onChange, range, value, variant });
      const maxSpy = spyOn(store, 'setMaxSliderValue');
      const viewModel = new ViewModel({
        maxInputPlaceholder: '2020',
        maxOnlyInputLabel: undefined,
        minInputPlaceholder: '2000',
        inputErrorLabel: 'Please enter a range of years within 2000-2020',
        inputStartAdornment: undefined,
        range,
        step: 1,
        store,
        variant,
        showInput: true,
      });
      viewModel.handleSliderChange(2018);
      expect(maxSpy).toHaveBeenCalledWith(2018);
    });
    it('handleSliderChange calls setMinSliderValue when variant is MIN_ONLY', () => {
      const onChange = (): void => {
        return;
      };
      const range = { max: 2020, min: 2000 };
      const value = { max: 2016, min: 2012 };
      const variant = Variant.MIN_ONLY;
      const store = new Store({ onChange, range, value, variant });
      const minSpy = spyOn(store, 'setMinSliderValue');
      const viewModel = new ViewModel({
        maxInputPlaceholder: '2020',
        maxOnlyInputLabel: undefined,
        minInputPlaceholder: '2000',
        inputErrorLabel: 'Please enter a range of years within 2000-2020',
        inputStartAdornment: undefined,
        range,
        step: 1,
        store,
        variant,
        showInput: true,
      });
      viewModel.handleSliderChange(2013);
      expect(minSpy).toHaveBeenCalledWith(2013);
    });
    it('handleSliderChange calls setMinSliderValue and setMaxSliderValue when variant is MAX_AND_MIN', () => {
      const onChange = (): void => {
        return;
      };
      const range = { max: 2020, min: 2000 };
      const value = { max: 2016, min: 2012 };
      const variant = Variant.MAX_AND_MIN;
      const store = new Store({ onChange, range, value, variant });
      const minSpy = spyOn(store, 'setMinSliderValue');
      const maxSpy = spyOn(store, 'setMaxSliderValue');
      const viewModel = new ViewModel({
        maxInputPlaceholder: '2020',
        maxOnlyInputLabel: undefined,
        minInputPlaceholder: '2000',
        inputErrorLabel: 'Please enter a range of years within 2000-2020',
        inputStartAdornment: undefined,
        range,
        step: 1,
        store,
        variant,
        showInput: true,
      });
      viewModel.handleSliderChange([2015, 2018]);
      expect(minSpy).toHaveBeenCalledWith(2015);
      expect(maxSpy).toHaveBeenCalledWith(2018);
    });
  });
});
