import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

const SimpleHeader: React.FC = () => {
  return <View viewModel={new ViewModel()} />;
};

export default SimpleHeader;
