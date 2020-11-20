import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import {
  InventoryStore,
  InventoryStoreContext,
} from 'src/modules/inventory/store';

const SafetyAndQuality: React.FC = () => {
  return (
    <InventoryStoreContext.Consumer>
      {(inventoryStore: InventoryStore): JSX.Element => {
        const viewModel = new ViewModel(inventoryStore);
        return <View viewModel={viewModel} />;
      }}
    </InventoryStoreContext.Consumer>
  );
};

export default SafetyAndQuality;
