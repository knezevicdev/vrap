import React, { useContext } from 'react';

import View from './View';
import ViewModel from './ViewModel';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { InventoryStoreContext } from 'src/modules/inventory/store';

const SimilarVehicles: React.FC = () => {
  const store = useContext(InventoryStoreContext);
  const analyticsHandler = new AnalyticsHandler();
  const viewModel = new ViewModel(store, analyticsHandler);
  return <View viewModel={viewModel} />;
};

export default SimilarVehicles;
