import React, { useContext } from 'react';

import View from './View';
import ViewModel from './ViewModel';

import { InventoryStoreContext } from 'src/modules/inventory/store';

const SimilarVehicles: React.FC = () => {
  const store = useContext(InventoryStoreContext);
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} />;
};

export default SimilarVehicles;
