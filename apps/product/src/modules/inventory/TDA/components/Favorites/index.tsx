import getConfig from 'next/config';
import React from 'react';

import FavoritesNetworker from './FavoritesNetworker';
import { FavoritesStore } from './store';
import View from './View';
import ViewModel from './ViewModel';

import {
  InventoryStore,
  InventoryStoreContext,
} from 'src/modules/inventory/store';
const { publicRuntimeConfig } = getConfig();
const gearboxPrivateUrl = publicRuntimeConfig.GEARBOX_PRIVATE_URL;
const Favorites: React.FC = () => {
  const favoritesNetworker = new FavoritesNetworker(
    gearboxPrivateUrl as string
  );
  return (
    <InventoryStoreContext.Consumer>
      {(store: InventoryStore): JSX.Element => {
        const viewModel = new ViewModel(
          store,
          new FavoritesStore(),
          favoritesNetworker
        );
        return <View viewModel={viewModel} />;
      }}
    </InventoryStoreContext.Consumer>
  );
};

export default Favorites;
