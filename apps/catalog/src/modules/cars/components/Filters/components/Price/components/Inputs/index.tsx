import React from 'react';

import InputsStore from './store';
import View from './View';
import ViewModel from './ViewModel';

import { MaxAndMin } from 'src/modules/cars/utils/url';

interface InputsProps {
  onChange: (value?: MaxAndMin) => void;
  range: MaxAndMin;
  value?: MaxAndMin;
}

const Inputs: React.FC<InputsProps> = ({ onChange, range, value }) => {
  const store = new InputsStore(onChange, range, value);
  const viewModel = new ViewModel(range, store);
  return <View viewModel={viewModel} />;
};

export default Inputs;
