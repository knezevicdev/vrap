import React, { useContext } from 'react';

import AnalyticsHandler from '../integrations/AnalyticsHandler';
import { InventoryStoreContext } from './store/inventoryStore';
import View from './View';
import ViewModel from './ViewModel';

const Vehicle: React.FC<{
  valuePropOrderKey: string | null;
}> = ({ valuePropOrderKey }) => {
  const store = useContext(InventoryStoreContext);
  const analyticsHandler = new AnalyticsHandler();
  const viewModel = new ViewModel(store, analyticsHandler, valuePropOrderKey);
  return <View viewModel={viewModel} />;
};

export default Vehicle;