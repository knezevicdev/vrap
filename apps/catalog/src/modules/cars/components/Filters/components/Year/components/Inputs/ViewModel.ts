import InputsStore from './store';

import { MaxAndMin } from 'src/modules/cars/utils/url';

class InputsViewModel {
  private readonly store: InputsStore;

  readonly errorLabel: string;
  readonly minInputPlaceholder: string;
  readonly maxInputPlaceholder: string;
  readonly range: MaxAndMin;

  constructor(range: MaxAndMin, store: InputsStore) {
    this.errorLabel = `'Please enter a range of years within ${range.min}-${range.max}`;
    this.minInputPlaceholder = range.min.toString();
    this.maxInputPlaceholder = range.max.toString();
    this.range = range;
    this.store = store;
  }

  hasError = (): boolean => {
    return this.store.errorMin || this.store.errorMax;
  };

  getMin = (): string => {
    return this.store.min;
  };

  getMax = (): string => {
    return this.store.max;
  };

  handleMinInputChange(value: string): void {
    this.store.setMin(value);
  }

  handleMaxInputChange(value: string): void {
    this.store.setMax(value);
  }
}

export default InputsViewModel;
