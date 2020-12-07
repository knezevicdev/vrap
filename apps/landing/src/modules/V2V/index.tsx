import React, { useContext } from 'react';

import { InventoryStoreContext } from './store/inventoryStore';
import View from './View';
import ViewModel from './ViewModel';

const Vehicle: React.FC = () => {
  const store = useContext(InventoryStoreContext);
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} />;
};

export default Vehicle;
