import React from 'react';

import { BuySellTradeStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

const BuySellTrade: React.FC = () => {
  const store = new BuySellTradeStore();
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} />;
};

export default BuySellTrade;
