import { action, observable } from 'mobx';

import { MaxAndMin } from 'src/modules/cars/utils/url';

class SliderStore {
  @observable value: number;

  constructor(range: MaxAndMin, state: string | undefined) {
    this.value = state ? parseInt(state) : range.min;
  }

  @action
  setValue = (value: number): void => {
    this.value = value;
  };
}

export default SliderStore;
