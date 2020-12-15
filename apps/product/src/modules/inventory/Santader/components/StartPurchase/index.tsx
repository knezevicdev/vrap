import getConfig from 'next/config';
import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import {
  InventoryStore,
  InventoryStoreContext,
} from 'src/modules/inventory/store';
import { StartPurchaseStore } from 'src/modules/inventory/Vroom/components/StartPurchase/store';

const { publicRuntimeConfig } = getConfig();

const gearboxPrivateUrl = publicRuntimeConfig.GEARBOX_PRIVATE_URL;

const StartPurchase: React.FC = () => {
  return (
    <InventoryStoreContext.Consumer>
      {(store: InventoryStore): JSX.Element => {
        const startPurchaseStore = new StartPurchaseStore(gearboxPrivateUrl);
        const viewModel = new ViewModel(store, startPurchaseStore);
        return <View viewModel={viewModel} />;
      }}
    </InventoryStoreContext.Consumer>
  );
};

export default StartPurchase;
