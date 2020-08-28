import getConfig from 'next/config';
import React from 'react';

import NotifyMeNetworker from './NotifyMeNetworker';
import { NotifyMeStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

import {
  InventoryStore,
  InventoryStoreContext,
} from 'src/modules/inventory/store';
const { publicRuntimeConfig } = getConfig();
const gearboxPrivateUrl = publicRuntimeConfig.GEARBOX_PRIVATE_URL;
const NotifyMe: React.FC = () => {
  const notifyMeNetworker = new NotifyMeNetworker(gearboxPrivateUrl as string);
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
