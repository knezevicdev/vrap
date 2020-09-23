import React, { useContext } from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { InventoryStoreContext } from 'src/modules/inventory/store';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

const SimilarVehicles: React.FC = () => {
  const store = useContext(InventoryStoreContext);
  const analyticsHandler = new AnalyticsHandler();
  const viewModel = new ViewModel(store, analyticsHandler);
  return <View viewModel={viewModel} />;
};

export default SimilarVehicles;
