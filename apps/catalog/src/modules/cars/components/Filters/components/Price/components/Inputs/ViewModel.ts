import { range } from '../../ViewModel';
import InputsStore from './store';

import { MaxAndMin } from 'src/modules/cars/utils/url';

class InputsViewModel {
  private readonly store: InputsStore;

  readonly errorLabel: string = 'Please enter prices within $4,000 - $125,000';
  readonly leftPlaceholder: string = range.min.toString();
  readonly rightPlaceholder: string = range.max.toString();
  onDone: (values: MaxAndMin) => void;

  constructor(store: InputsStore, onDone: (values: MaxAndMin) => void) {
    this.store = store;
    this.onDone = onDone;
  }

  getError = (): boolean => {
    return this.store.error;
  };

  getMin = (): string => {
    return this.store.values[0];
  };

  getMax = (): string => {
    return this.store.values[1];
  };

  private hasError = (values: string[]): boolean => {
    if (values[0] !== '' && values[1] !== '') {
      const min = parseInt(values[0]);
      const max = parseInt(values[1]);
      return min > max || min < range.min || max > range.max;
    }
    return true;
  };

  private changeURL = (values: string[]): void => {
    const min = parseInt(values[0]);
    const max = parseInt(values[1]);
    this.onDone({ min: min, max: max });
  };

  setValues = (values: string[]): void => {
    this.store.setValues(values);

    if (this.hasError(values)) {
      this.store.setError(true);
    } else {
      this.store.setError(false);
      this.changeURL(values);
    }
  };
}

export default InputsViewModel;
