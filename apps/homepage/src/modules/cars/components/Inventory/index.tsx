import React, { useContext } from 'react';

import { CarsContext } from '../../util';
import { InventoryProps } from './types';
import View from './View';
import InventoryViewModel from './ViewModel';

const Inventory: React.FC<InventoryProps> = props => {
  const { store } = useContext(CarsContext);
  const viewModel = new InventoryViewModel(store);
  return <View {...props} viewModel={viewModel} />;
};

export default Inventory;
