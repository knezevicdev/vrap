import { range } from '../../ViewModel';
import SliderStore from './store';

import { MaxAndMin } from 'src/modules/cars/utils/url';

class SliderViewModel {
  private readonly store: SliderStore;
  readonly min: number = range.min;
  readonly max: number = range.max;

  onDone: (miles: MaxAndMin) => void;

  constructor(store: SliderStore, onDone: (miles: MaxAndMin) => void) {
    this.store = store;
    this.onDone = onDone;
  }

  setValue = (value: number): void => {
    this.store.setValue(value);
  };

  getValue = (): number => {
    return this.store.value;
  };
}

export default SliderViewModel;
