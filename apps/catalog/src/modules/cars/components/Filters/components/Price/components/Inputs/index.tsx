import React from 'react';

import InputsStore from './store';
import View from './View';
import ViewModel from './ViewModel';

import { MaxAndMin } from 'src/modules/cars/utils/url';

interface InputsProps {
  state: string[] | undefined;
  onDone: (values: MaxAndMin) => void;
}

const Inputs: React.FC<InputsProps> = (props) => {
  const { state, onDone } = props;
  const store = new InputsStore(state);
  const viewModel = new ViewModel(store, onDone);
  return <View viewModel={viewModel} />;
};

export default Inputs;
