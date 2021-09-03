import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';

const TransactionOverview: React.FC = () => {
  const { store, network } = useAppStore();
  const viewModel = new ViewModel(store, network);
  return <View viewModel={viewModel} />;
};

export default TransactionOverview;
