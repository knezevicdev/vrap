import React from 'react';

import { OptionsStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

const Options: React.FC = () => {
  const store = new OptionsStore();
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} />;
};

export default Options;
