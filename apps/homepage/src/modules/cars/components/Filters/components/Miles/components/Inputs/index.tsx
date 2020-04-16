import React from 'react';

import { MaxAndMin } from '../../../../../../util';
import View from './View';
import ViewModel from './ViewModel';

interface InputsProps {
  state: string | undefined;
  onDone: (values: MaxAndMin | undefined) => void;
}

const Inputs: React.FC<InputsProps> = props => {
  const { state, onDone } = props;
  const viewModel = new ViewModel(state, onDone);
  return <View viewModel={viewModel} />;
};

export default Inputs;
