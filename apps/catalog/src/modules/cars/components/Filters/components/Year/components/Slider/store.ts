import { action, observable } from 'mobx';

import { MaxAndMin } from 'src/modules/cars/utils/url';

class SliderStore {
  @observable values: MaxAndMin;

  constructor(range: MaxAndMin, value?: MaxAndMin) {
    if (!value) {
      this.values = range;
      return;
    }
    const isValidValue =
      value.min >= range.min &&
      value.min <= range.max &&
      value.max >= value.min &&
      value.max <= range.max;

    if (!isValidValue) {
      this.values = range;
    }
    this.values = value;
  }

  @action
  setValues = (values: MaxAndMin): void => {
    this.values = values;
  };
}

export default SliderStore;
