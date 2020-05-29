import { range } from '../../ViewModel';
import SliderStore from './store';

class SliderViewModel {
  private readonly store: SliderStore;
  readonly min: number = range.min;
  readonly max: number = range.max;
  onDone: (values: number[]) => void;

  constructor(store: SliderStore, onDone: (values: number[]) => void) {
    this.store = store;
    this.onDone = onDone;
  }

  setValues = (values: number[]): void => {
    this.store.setValues(values);
  };

  getValues = (): number[] => {
    return this.store.values.slice();
  };
}

export default SliderViewModel;
