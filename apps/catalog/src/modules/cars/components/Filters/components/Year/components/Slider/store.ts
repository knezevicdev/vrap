import { action, observable } from 'mobx';

class SliderStore {
  @observable values: number[];

  constructor(state: number[]) {
    this.values = state;
  }

  @action
  setValues = (values: number[]): void => {
    this.values = values;
  };
}

export default SliderStore;
