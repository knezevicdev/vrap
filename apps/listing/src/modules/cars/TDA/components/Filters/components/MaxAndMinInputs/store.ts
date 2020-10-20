import { MaxAndMin } from '@vroom-web/catalog-url-integration';
import debounce from 'lodash.debounce';
import { action, observable } from 'mobx';

import { Variant } from './index';

// The amount of time a user must stop typing before we commit to what's typed.
const INPUT_DEBOUNCE_WAIT = 650; // milliseconds

interface ConstructorProps {
  onChange: (value?: MaxAndMin) => void;
  range: MaxAndMin;
  value?: MaxAndMin;
  variant: Variant;
}

class MaxAndMinInputsStore {
  private readonly onChange: (value?: MaxAndMin) => void;
  private readonly variant: Variant;

  @observable minInputValue: string;
  @observable maxInputValue: string;
  @observable minSliderValue: number;
  @observable maxSliderValue: number;
  @observable hasInputError = false;
  @observable range: MaxAndMin;
  @observable value?: MaxAndMin;

  constructor(constructorProps: ConstructorProps) {
    const { onChange, range, value, variant } = constructorProps;
    this.onChange = onChange;
    this.range = range;
    const clampedMin = value && value.min >= range.min ? value.min : range.min;
    const clampedMax = value && value.max <= range.max ? value.max : range.max;
    this.minInputValue = value ? `${clampedMin}` : '';
    this.maxInputValue = value ? `${clampedMax}` : '';
    this.minSliderValue = value ? value.min : range.min;
    this.maxSliderValue = value ? value.max : range.max;
    this.variant = variant;
  }

  @action
  setHasInputError(value: boolean): void {
    this.hasInputError = value;
  }

  private isInvalidValue = (value: number): boolean => {
    return isNaN(value) || value > this.range.max || value < this.range.min;
  };

  private afterSetMinInputValue = debounce((minInputValue: string) => {
    if (minInputValue === '' && this.maxInputValue === '') {
      this.setHasInputError(false);
      this.onChange(undefined);
      return;
    }

    if (minInputValue === '') {
      return;
    }

    const maxInputInt = parseInt(this.maxInputValue) || this.range.max;
    const maxInputInvalid = this.isInvalidValue(maxInputInt);
    const minInputInt = parseInt(minInputValue);
    const minInputInvalid =
      this.isInvalidValue(minInputInt) || minInputInt > maxInputInt;

    if (minInputInvalid) {
      this.setHasInputError(true);
      return;
    }

    if (maxInputInvalid) {
      this.setHasInputError(true);
      return;
    }

    this.onChange({
      min: minInputInt,
      max: maxInputInt,
    });
  }, INPUT_DEBOUNCE_WAIT);

  private afterSetMaxInputValue = debounce((maxInputValue: string) => {
    if (this.minInputValue === '' && maxInputValue === '') {
      this.setHasInputError(false);
      this.onChange(undefined);
      return;
    }

    if (maxInputValue === '') {
      if (this.variant === Variant.MAX_ONLY) {
        this.onChange(undefined);
      }
      return;
    }

    const minInputInt = parseInt(this.minInputValue) || this.range.min;
    const minInputInvalid = this.isInvalidValue(minInputInt);
    const maxInputInt = parseInt(maxInputValue);
    const maxInputInvalid =
      this.isInvalidValue(maxInputInt) || maxInputInt < minInputInt;

    if (maxInputInvalid) {
      this.setHasInputError(true);
      return;
    }

    if (this.minInputValue === '') {
      if (this.variant === Variant.MAX_ONLY) {
        this.onChange({
          min: this.range.min,
          max: maxInputInt,
        });
      }
    }

    if (minInputInvalid) {
      this.setHasInputError(true);
      return;
    }

    this.onChange({
      min: minInputInt,
      max: maxInputInt,
    });
  }, INPUT_DEBOUNCE_WAIT);

  @action
  setMinInputValue(minInputValue: string): void {
    this.minInputValue = minInputValue;
    this.afterSetMinInputValue(minInputValue);
  }

  @action
  setMaxInputValue(maxInputValue: string): void {
    this.maxInputValue = maxInputValue;
    this.afterSetMaxInputValue(maxInputValue);
  }

  @action
  setMinSliderValue(minSliderValue: number): void {
    this.minSliderValue = minSliderValue;
  }

  @action
  setMaxSliderValue(maxSliderValue: number): void {
    this.maxSliderValue = maxSliderValue;
  }

  commitSliderChanges(): void {
    this.onChange({
      max: this.maxSliderValue ? this.maxSliderValue : this.range.max,
      min: this.minSliderValue ? this.minSliderValue : this.range.min,
    });
  }
}

export default MaxAndMinInputsStore;
