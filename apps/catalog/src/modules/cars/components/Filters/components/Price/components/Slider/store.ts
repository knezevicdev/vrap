import { action, observable } from 'mobx';

import { MaxAndMin } from 'src/modules/cars/utils/types';

class SliderStore {
  @observable values: MaxAndMin;

  constructor(state: MaxAndMin) {
    this.values = state;
  }

  @action
  setValues = (values: MaxAndMin): void => {
    this.values = values;
  };
}

export default SliderStore;
