import React from 'react';

import View from './View';
import PendingPriceViewModel from './ViewModel';

import { useAppStore } from 'src/context';

const PendingPrice: React.FC = () => {
  const { store } = useAppStore();
  const viewModel = new PendingPriceViewModel(store);
  return <View viewModel={viewModel} />;
};

export default PendingPrice;
