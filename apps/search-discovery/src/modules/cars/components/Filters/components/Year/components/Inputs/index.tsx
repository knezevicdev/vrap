import React from 'react';

import InputsStore from '../../../Price/components/Inputs/store';
import View from './View';
import ViewModel from './ViewModel';

interface InputsProps {
  state: string[] | undefined;
  onDone: (values: number[]) => void;
}

const Inputs: React.FC<InputsProps> = props => {
  const { state, onDone } = props;
  const store = new InputsStore(state);
  const viewModel = new ViewModel(store, onDone);
  return <View viewModel={viewModel} />;
};

export default Inputs;
