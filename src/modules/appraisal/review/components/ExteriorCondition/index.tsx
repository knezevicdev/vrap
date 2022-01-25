import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';

const ExteriorCondition: React.FC = () => {
  const { store } = useAppStore();
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} store={store} />;
};

export default ExteriorCondition;