import { MaxAndMin } from '@vroom-web/catalog-url-integration';
import React from 'react';

import Store from './store';
import View from './View';
import ViewModel from './ViewModel';

export enum Variant {
  MAX_AND_MIN = 'MAX_AND_MIN',
  MAX_ONLY = 'MAX_ONLY',
}

interface Props {
  inputErrorLabel: string;
  inputStartAdornment?: React.ReactNode;
  maxInputPlaceholder?: string;
  maxOnlyInputLabel?: string;
  minInputPlaceholder?: string;
  onChange: (value?: MaxAndMin) => void;
  range: MaxAndMin;
  step: number;
  value?: MaxAndMin;
  variant?: Variant;
}

const MaxAndMinInputs: React.FC<Props> = ({
  inputErrorLabel,
  inputStartAdornment,
  maxInputPlaceholder,
  maxOnlyInputLabel,
  minInputPlaceholder,
  onChange,
  range,
  step,
  value,
  variant = Variant.MAX_AND_MIN,
}) => {
  const store = new Store({ onChange, range, value, variant });
  const viewModel = new ViewModel({
    maxInputPlaceholder,
    maxOnlyInputLabel,
    minInputPlaceholder,
    inputErrorLabel,
    inputStartAdornment,
    range,
    step,
    store,
    variant,
  });
  return <View viewModel={viewModel} />;
};

export default MaxAndMinInputs;
