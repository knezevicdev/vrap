import React from 'react';

import Model from './Model';
import View from './View';
import ViewModel from './ViewModel';

const Forgot: React.FC = () => {
  const viewModel = new ViewModel(new Model());
  return <View viewModel={viewModel} />;
};

export default Forgot;
