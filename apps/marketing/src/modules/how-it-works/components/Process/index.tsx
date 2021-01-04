import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

const Process: React.FC = () => {
  const viewModel = new ViewModel();
  return <View viewModel={viewModel} />;
};

export default Process;
