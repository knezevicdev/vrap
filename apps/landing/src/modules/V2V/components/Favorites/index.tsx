import getConfig from 'next/config';
import React from 'react';

import FavoritesNetworker from './FavoritesNetworker';
import { FavoritesStore } from '../../store/favoritesStore';
import { InventoryStore } from '../../store/inventoryStore';
import View from './View';
import ViewModel from './ViewModel';

const { publicRuntimeConfig } = getConfig();

const gearboxPrivateUrl = publicRuntimeConfig.GEARBOX_PRIVATE_URL;

const Favorites: React.FC = () => {
  const favoritesNetworker = new FavoritesNetworker(
    gearboxPrivateUrl as string
  );

  const favoritesStore = new FavoritesStore();
  const inventoryStore = new InventoryStore();
  const viewModel = new ViewModel(
    inventoryStore,
    favoritesStore,
    favoritesNetworker
  );
  return <View viewModel={viewModel} />;
};

export default Favorites;
