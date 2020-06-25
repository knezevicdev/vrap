import { action, observable } from 'mobx';

import { range } from '../../ViewModel';

import { MaxAndMin } from 'src/modules/cars/utils/url';

class InputsStore {
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

export default InputsStore;
