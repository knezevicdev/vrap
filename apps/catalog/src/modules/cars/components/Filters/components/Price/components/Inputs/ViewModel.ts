import InputsStore from './store';

import { MaxAndMin } from 'src/modules/cars/utils/url';

class InputsViewModel {
  private readonly store: InputsStore;
  private currencyFormatter: Intl.NumberFormat;

  readonly errorLabel: string;
  readonly minInputPlaceholder: string;
  readonly maxInputPlaceholder: string;
  readonly range: MaxAndMin;

  constructor(range: MaxAndMin, store: InputsStore) {
    this.currencyFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    const minPriceLabel = this.currencyFormatter.format(range.min);
    const maxPriceLabel = this.currencyFormatter.format(range.max);
    this.errorLabel = `Please enter prices within ${minPriceLabel} - ${maxPriceLabel}`;
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
