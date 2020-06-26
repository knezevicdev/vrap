import SliderStore from './store';

import { MaxAndMin } from 'src/modules/cars/utils/url';

class SliderViewModel {
  private readonly store: SliderStore;
  readonly min: number;
  readonly max: number;

  onDone: (miles: MaxAndMin) => void;

  constructor(
    onDone: (miles: MaxAndMin) => void,
    range: MaxAndMin,
    store: SliderStore
  ) {
    this.min = range.min;
    this.max = range.max;
    this.onDone = onDone;
    this.store = store;
  }

  setValue = (value: number): void => {
    this.store.setValue(value);
  };

  getValue = (): number => {
    return this.store.value;
  };
}

export default SliderViewModel;
