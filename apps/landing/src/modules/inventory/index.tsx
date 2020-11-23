import React, { useContext } from 'react';
import { InventoryStoreContext } from './store/store';
import ViewModel from './ViewModel';
import View from './View';

const Vehicle: React.FC = () => {
  const store = useContext(InventoryStoreContext);
  const viewModel = new ViewModel(store);
  return <View viewModel={viewModel} />;
};

export default Vehicle;
