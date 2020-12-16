import React, { useContext } from 'react';

import View from './View';
import ViewModel from './ViewModel';

import AnalyticsHandler from 'src/modules/integrations/AnalyticsHandler';
import { InventoryStoreContext } from 'src/modules/V2V/store/inventoryStore';

declare global {
  interface Window {
    YT: any;
  }
}

const BuySellTrade: React.FC = () => {
  const store = useContext(InventoryStoreContext);
  const analyticsHandler = new AnalyticsHandler();
  const viewModel = new ViewModel(store, analyticsHandler);
  return <View viewModel={viewModel} />;
};

export default BuySellTrade;
