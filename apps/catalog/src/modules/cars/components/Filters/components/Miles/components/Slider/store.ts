import { action, observable } from 'mobx';

import { range } from '../../ViewModel';

class SliderStore {
  @observable value: number;

  constructor(state: string | undefined) {
    this.value = state ? parseInt(state) : range.min;
  }

  @action
  setValue = (value: number): void => {
    this.value = value;
  };
}

export default SliderStore;
