import React from 'react';

import { BuySellTradeBuyStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

import { HomeStore, HomeStoreContext } from 'src/modules/home/store';

const Buy: React.FC = () => {
  return (
    <HomeStoreContext.Consumer>
      {(homeStore: HomeStore): JSX.Element => {
        const buySellTradeBuyStore = new BuySellTradeBuyStore();
        const viewModel = new ViewModel(homeStore, buySellTradeBuyStore);
        return <View viewModel={viewModel} />;
      }}
    </HomeStoreContext.Consumer>
  );
};

export default Buy;
