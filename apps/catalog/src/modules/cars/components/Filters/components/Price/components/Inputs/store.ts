import { action, observable } from 'mobx';

import { MaxAndMin } from 'src/modules/cars/utils/url';

class InputsStore {
  private readonly range: MaxAndMin;
  @observable min = '';
  @observable max = '';
  @observable errorMin = false;
  @observable errorMax = false;
  onChange: (value?: MaxAndMin) => void;

  constructor(
    onChange: (value?: MaxAndMin) => void,
    range: MaxAndMin,
    value?: MaxAndMin
  ) {
    this.onChange = onChange;
    this.range = range;
    if (!value) {
      return;
    }
    this.min =
      value.min >= range.min ? value.min.toString() : range.min.toString();
    this.max =
      value.max <= range.max ? value.max.toString() : range.max.toString();
  }

  @action
  setMin = (min: string): void => {
    const intMax = parseInt(this.max);
    const errorMax =
      isNaN(intMax) || intMax < this.range.min || intMax > this.range.max;
    this.min = min;
    if (min === '') {
      this.errorMin = false;
      if (this.max === '') {
        this.onChange(undefined);
        return;
      }
      if (!errorMax) {
        this.onChange({
          min: this.range.min,
          max: intMax,
        });
      }
      return;
    }
    const intMin = parseInt(min);
    const errorMin =
      isNaN(intMin) ||
      intMin < this.range.min ||
      intMin > this.range.max ||
      intMin > intMax;
    this.errorMin = errorMin;
    if (!this.errorMin) {
      if (this.max === '') {
        this.onChange({
          min: intMin,
          max: this.range.max,
        });
        return;
      }
      if (!errorMax) {
        this.onChange({
          min: intMin,
          max: intMax,
        });
      }
    }
  };

  @action
  setMax = (max: string): void => {
    const intMin = parseInt(this.min);
    const errorMin =
      isNaN(intMin) || intMin < this.range.min || intMin > this.range.max;
    this.max = max;
    if (max === '') {
      this.errorMax = false;
      if (this.min === '') {
        this.onChange(undefined);
        return;
      }
      if (!errorMin) {
        this.onChange({
          min: intMin,
          max: this.range.max,
        });
      }
      return;
    }
    const intMax = parseInt(max);
    const errorMax =
      isNaN(intMax) ||
      intMax < this.range.min ||
      intMax > this.range.max ||
      intMax < intMin;
    this.errorMax = errorMax;
    if (!this.errorMax) {
      if (this.min === '') {
        this.onChange({
          min: this.range.min,
          max: intMax,
        });
        return;
      }
      if (!errorMin) {
        this.onChange({
          min: intMin,
          max: intMax,
        });
      }
    }
  };
}

export default InputsStore;
