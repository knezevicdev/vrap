import { range } from '../../ViewModel';
import SliderStore from './store';

import { MaxAndMin } from 'src/modules/cars/utils/types';

class SliderViewModel {
  private readonly store: SliderStore;
  readonly min: number = range.min;
  readonly max: number = range.max;
  onDone: (price: MaxAndMin) => void;

  constructor(store: SliderStore, onDone: (price: MaxAndMin) => void) {
    this.store = store;
    this.onDone = onDone;
  }

  setValues = (values: MaxAndMin): void => {
    this.store.setValues(values);
  };

  getValues = (): number[] => {
    const values = this.store.values;
    return [values.min, values.max];
  };
}

export default SliderViewModel;
