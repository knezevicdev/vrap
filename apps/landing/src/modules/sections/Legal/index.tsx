import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

const Legal: React.FC = () => {
  return <View viewModel={new ViewModel()} />;
};

export default Legal;