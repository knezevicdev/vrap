import React from 'react';

import NotifyMeNetworker from './NotifyMeNetworker';
import { NotifyMeStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

import {
  InventoryStore,
  InventoryStoreContext,
} from 'src/modules/inventory/store';

const NotifyMe: React.FC = () => {
  const notifyMeNetworker = new NotifyMeNetworker(
    'https://horn-dev-int.vroomapi.com'
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
