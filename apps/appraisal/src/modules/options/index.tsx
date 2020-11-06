import React from 'react';

import { useOptionsStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

const Options: React.FC = () => {
  const store = useOptionsStore();
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} />;
};

export default Options;
