import { action, observable } from 'mobx';

import { MaxAndMin } from '../../../../../../util';
import { range } from '../../ViewModel';

class SliderViewModel {
  readonly min: number = range.min;
  readonly max: number = range.max;

  @observable value: number;
  onDone: (miles: MaxAndMin) => void;

  constructor(state: string | undefined, onDone: (miles: MaxAndMin) => void) {
    this.value = state ? parseInt(state) : this.min;
    this.onDone = onDone;
  }

  @action
  setValue = (value: number): void => {
    this.value = value;
  };
}

export default SliderViewModel;
