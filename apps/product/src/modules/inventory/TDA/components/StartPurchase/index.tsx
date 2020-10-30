import getConfig from 'next/config';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const query = router.query;
  return (
    <InventoryStoreContext.Consumer>
      {(inventoryStore: InventoryStore): JSX.Element => {
        const startPurchaseStore = new StartPurchaseStore(gearboxPrivateUrl);
        const viewModel = new ViewModel(
          query,
          inventoryStore,
          startPurchaseStore
        );
        return <View viewModel={viewModel} />;
      }}
    </InventoryStoreContext.Consumer>
  );
};

export default StartPurchase;