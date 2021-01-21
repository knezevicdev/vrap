import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { AsyncStore } from 'src/interfaces.d';

const AsyncIndicator: React.FC<{ store: AsyncStore }> = ({ store }) => {
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} />;
};

export default AsyncIndicator;
