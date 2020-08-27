import React from 'react';

import { SellStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

const Sell: React.FC = () => {
  const store = new SellStore();
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} />;
};

export default Sell;
