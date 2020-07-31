import React from 'react';

import { StartPurchaseStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

import {
  InventoryStore,
  InventoryStoreContext,
} from 'src/modules/inventory/store';

const StartPurchase: React.FC = () => {
  return (
    <InventoryStoreContext.Consumer>
      {(store: InventoryStore): JSX.Element => {
        const viewModel = new ViewModel(store, new StartPurchaseStore());
        return <View viewModel={viewModel} />;
      }}
    </InventoryStoreContext.Consumer>
  );
};

export default StartPurchase;
