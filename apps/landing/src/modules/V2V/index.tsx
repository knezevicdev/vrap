import React, { useContext } from 'react';

import { InventoryStoreContext } from './store/inventoryStore';
import View from './View';
import ViewModel from './ViewModel';

const Vehicle: React.FC<{
  valuePropOrderKey: string | null;
}> = ({ valuePropOrderKey }) => {
  const store = useContext(InventoryStoreContext);
  const viewModel = new ViewModel(store, valuePropOrderKey);
  return <View viewModel={viewModel} />;
};

export default Vehicle;
