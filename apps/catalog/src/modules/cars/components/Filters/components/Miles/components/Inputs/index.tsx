import React from 'react';

import InputsStore from './store';
import View from './View';
import ViewModel from './ViewModel';

import { MaxAndMin } from 'src/modules/cars/utils/url';

interface InputsProps {
  state: string | undefined;
  onDone: (values: MaxAndMin | undefined) => void;
}

const Inputs: React.FC<InputsProps> = (props) => {
  const { state, onDone } = props;
  const store = new InputsStore(state, onDone);
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} />;
};

export default Inputs;
