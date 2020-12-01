import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

const ValueProps: React.FC = () => {
  return <View viewModel={new ViewModel()} />;
};

export default ValueProps;
