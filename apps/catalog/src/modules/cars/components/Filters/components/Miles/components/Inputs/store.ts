import { action, observable } from 'mobx';

import { MaxAndMin } from 'src/modules/cars/utils/url';

class InputsStore {
  @observable value: string | undefined;
  @observable error = false;
  onDone: (miles: MaxAndMin | undefined) => void;
  range: MaxAndMin;

  constructor(
    onDone: (values: MaxAndMin | undefined) => void,
    range: MaxAndMin,
    state: string | undefined
  ) {
    this.onDone = onDone;
    this.range = range;
    this.value = state;
  }

  @action
  setValue = (value: string): void => {
    if (value === '') {
      this.error = false;
      this.value = '';
      this.onDone(undefined);
      return;
    }
    const intValue = parseInt(value);
    const error =
      isNaN(intValue) || intValue < this.range.min || intValue > this.range.max;
    this.error = error;
    this.value = value.toString();
    if (!error) {
      this.onDone({ min: 0, max: intValue });
    }
  };
}

export default InputsStore;
