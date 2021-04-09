import React from 'react';

import { BuySellTradeStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

interface Props {
  swapTabs: boolean;
  changeTabLabel: boolean;
}

const BuySellTrade: React.FC<Props> = ({ swapTabs, changeTabLabel }) => {
  const store = new BuySellTradeStore();
  const viewModel = new ViewModel(store);
  return (
    <View
      viewModel={viewModel}
      swapTabs={swapTabs}
      changeTabLabel={changeTabLabel}
    />
  );
};

export default BuySellTrade;
