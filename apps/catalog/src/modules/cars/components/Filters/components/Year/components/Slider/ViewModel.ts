import SliderStore from './store';

import { MaxAndMin } from 'src/modules/cars/utils/url';

class SliderViewModel {
  private onChange: (price?: MaxAndMin) => void;
  private readonly store: SliderStore;
  readonly range: MaxAndMin;

  constructor(
    onChange: (price?: MaxAndMin) => void,
    range: MaxAndMin,
    store: SliderStore
  ) {
    this.onChange = onChange;
    this.range = range;
    this.store = store;
  }

  getValues = (): number[] => {
    const values = this.store.values;
    return [values.min, values.max];
  };

  handleSliderChange = (values: MaxAndMin): void => {
    this.store.setValues(values);
  };

  handleSliderChangeCommitted = (values: MaxAndMin): void => {
    if (values.min === this.range.min && values.max === this.range.max) {
      this.onChange(undefined);
    } else {
      this.onChange(values);
    }
  };
}

export default SliderViewModel;
