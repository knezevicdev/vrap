import { action, observable } from 'mobx';

import { MaxAndMin } from '../../../../../../util';
import { range } from '../../ViewModel';

class InputsViewModel {
  readonly errorLabel: string =
    'Please enter a mileage less than or equal to 200,000';
  readonly placeholder: string = 'No Maximum';

  @observable value: string | undefined;
  @observable error = false;
  onDone: (miles: MaxAndMin) => void;

  constructor(
    state: string | undefined,
    onDone: (values: MaxAndMin | undefined) => void
  ) {
    this.value = state;
    this.onDone = onDone;
  }

  getValue = (): string => {
    return this.value ? this.value : '';
  };

  @action
  setValue = (value: number): void => {
    const error = value < range.min || value > range.max;
    this.value = value.toString();
    this.error = error;

    if (!error) {
      this.onDone({ min: 0, max: value });
    }
  };
}

export default InputsViewModel;
