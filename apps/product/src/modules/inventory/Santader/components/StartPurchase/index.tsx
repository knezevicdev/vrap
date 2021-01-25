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

const {
  GEARBOX_PRIVATE_URL: gearboxPrivateUrl,
  VROOM_URL: vroomUrl,
} = publicRuntimeConfig;

const StartPurchase: React.FC = () => {
  return (
    <InventoryStoreContext.Consumer>
      {(store: InventoryStore): JSX.Element => {
        const startPurchaseStore = new StartPurchaseStore(gearboxPrivateUrl);
        const viewModel = new ViewModel(store, startPurchaseStore, vroomUrl);
        return <View viewModel={viewModel} />;
      }}
    </InventoryStoreContext.Consumer>
  );
};

export default StartPurchase;
