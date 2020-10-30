import React from 'react';

import Store from './store';
import View from './View';
import ViewModel from './ViewModel';

const TDAHeader: React.FC = () => {
  const viewModel = new ViewModel(new Store());
  return <View viewModel={viewModel} />;
};

export default TDAHeader;