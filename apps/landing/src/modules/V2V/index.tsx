import React, { useContext } from 'react';

import { InventoryStoreContext } from './store/inventoryStore';
import View from './View';
import ViewModel from './ViewModel';
import AnalyticsHandler from './integrations/AnalyticsHandler';

const Vehicle: React.FC = () => {
  const store = useContext(InventoryStoreContext);
  const analyticsHandler = new AnalyticsHandler();
  const viewModel = new ViewModel(store, analyticsHandler);
  return <View viewModel={viewModel} />;
};

export default Vehicle;
