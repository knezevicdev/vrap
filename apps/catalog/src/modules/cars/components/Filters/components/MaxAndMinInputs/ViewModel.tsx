import { Variant } from './index';
import MaxAndMinInputsStore from './store';

import { MaxAndMin } from 'src/modules/cars/utils/url';

interface ConstructorProps {
  inputErrorLabel: string;
  inputStartAdornment: React.ReactNode;
  maxInputPlaceholder?: string;
  maxOnlyInputLabel?: string;
  minInputPlaceholder?: string;
  range: MaxAndMin;
  step: number;
  store: MaxAndMinInputsStore;
  variant: Variant;
}

class MaxAndMinInputsViewModel {
  private readonly store: MaxAndMinInputsStore;

  readonly inputErrorLabel: string;
  readonly inputStartAdornment: React.ReactNode;
  readonly maxOnlyInputLabel?: string;
  readonly max: number;
  readonly maxInputPlaceholder: string;
  readonly min: number;
  readonly minInputPlaceholder: string;
  readonly step: number;
  readonly variant: Variant;

  constructor(constructorProps: ConstructorProps) {
    const {
      inputErrorLabel,
      inputStartAdornment,
      maxInputPlaceholder,
      maxOnlyInputLabel,
      minInputPlaceholder,
      range,
      step,
      store,
      variant,
    } = constructorProps;
    this.inputErrorLabel = inputErrorLabel;
    this.inputStartAdornment = inputStartAdornment;
    this.maxOnlyInputLabel = maxOnlyInputLabel;
    this.max = range.max;
    this.maxInputPlaceholder = maxInputPlaceholder
      ? maxInputPlaceholder
      : `${range.max}`;
    this.min = range.min;
    this.minInputPlaceholder = minInputPlaceholder
      ? minInputPlaceholder
      : `${range.min}`;
    this.step = step;
    this.store = store;
    this.variant = variant;
  }

  hasInputError = (): boolean => {
    return this.store.hasInputError;
  };

  getMinInputValue = (): string => {
    return this.store.minInputValue;
  };

  getMaxInputValue = (): string => {
    return this.store.maxInputValue;
  };

  getSliderValue = (): number | number[] => {
    if (this.variant === Variant.MAX_ONLY) {
      return this.store.maxSliderValue;
    }
    return [this.store.minSliderValue, this.store.maxSliderValue];
  };

  handleMinInputChange = (value: string): void => {
    this.store.setMinInputValue(value);
  };

  handleMaxInputChange = (value: string): void => {
    this.store.setMaxInputValue(value);
  };

  handleSliderChange = (value: number | number[]): void => {
    if (this.variant === Variant.MAX_ONLY) {
      const max = value as number;
      this.store.setMaxSliderValue(max);
      return;
    }
    const values = value as number[];
    this.store.setMinSliderValue(values[0]);
    this.store.setMaxSliderValue(values[1]);
  };

  handleSliderChangeCommitted = (value: number | number[]): void => {
    this.handleSliderChange(value);
    this.store.commitSliderChanges();
  };
}

export default MaxAndMinInputsViewModel;
