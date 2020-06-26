import React from 'react';

import InputsStore from './store';
import View from './View';
import ViewModel from './ViewModel';

import { MaxAndMin } from 'src/modules/cars/utils/url';

interface InputsProps {
  onDone: (values: MaxAndMin | undefined) => void;
  range: MaxAndMin;
  state: string | undefined;
}

const Inputs: React.FC<InputsProps> = ({ onDone, range, state }) => {
  const store = new InputsStore(onDone, range, state);
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} />;
};

export default Inputs;
