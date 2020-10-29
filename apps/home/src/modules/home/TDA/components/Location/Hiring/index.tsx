import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

const Hiring: React.FC = () => {
  const viewModel = new ViewModel();
  return <View viewModel={viewModel} />;
};

export default Hiring;
