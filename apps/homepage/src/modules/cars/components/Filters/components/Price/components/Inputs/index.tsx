import React from 'react';

import { InputsProps } from './types';
import View from './View';
import ViewModel from './ViewModel';

const Inputs: React.FC<InputsProps> = props => {
  const viewModel = new ViewModel();
  return <View {...props} viewModel={viewModel} />;
};

export default Inputs;
