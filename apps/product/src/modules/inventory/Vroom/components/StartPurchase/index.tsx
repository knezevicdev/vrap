import { useRouter } from 'next/router';
import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

import {
  InventoryStore,
  InventoryStoreContext,
} from 'src/modules/inventory/store';

const StartPurchase: React.FC = () => {
  const router = useRouter();
  const query = router.query;
  return (
    <InventoryStoreContext.Consumer>
      {(store: InventoryStore): JSX.Element => {
        const viewModel = new ViewModel(query, store);
        return <View viewModel={viewModel} />;
      }}
    </InventoryStoreContext.Consumer>
  );
};

export default StartPurchase;
