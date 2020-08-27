import React from 'react';

import NotifyMeNetworker from './NotifyMeNetworker';
import { NotifyMeStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

import globalEnv from 'src/globalEnv';
import {
  InventoryStore,
  InventoryStoreContext,
} from 'src/modules/inventory/store';

const NotifyMe: React.FC = () => {
  const notifyMeNetworker = new NotifyMeNetworker(
    globalEnv.GEARBOX_PUBLIC_URL as string
    // 'https://gearbox-dev-int.vroomapi.com/query-private'
  );
  return (
    <InventoryStoreContext.Consumer>
      {(store: InventoryStore): JSX.Element => {
        const viewModel = new ViewModel(
          store,
          new NotifyMeStore(),
          notifyMeNetworker
        );
        return <View viewModel={viewModel} />;
      }}
    </InventoryStoreContext.Consumer>
  );
};

export default NotifyMe;
