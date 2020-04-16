import { range } from '../../ViewModel';

class SliderViewModel {
  readonly min: number = range.min;
  readonly max: number = range.max;
}

export default SliderViewModel;
