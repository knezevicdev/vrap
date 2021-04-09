import React from 'react';

import { BuySellTradeStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

const BuySellTrade: React.FC = ({ swapTabs, changeTabLabel }) => {
  const store = new BuySellTradeStore();
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} swapTabs={swapTabs} changeTabLabel={changeTabLabel} />;
};

export default BuySellTrade;
