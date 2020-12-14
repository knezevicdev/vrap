import getConfig from 'next/config';
import React, { useContext } from 'react';

import { FavoritesStore } from '../../store/favoritesStore';
import { InventoryStoreContext } from '../../store/inventoryStore';
import FavoritesNetworker from './FavoritesNetworker';
import View from './View';
import ViewModel from './ViewModel';
import AnalyticsHandler from '../../integrations/AnalyticsHandler';

const { publicRuntimeConfig } = getConfig();
const gearboxPrivateUrl = publicRuntimeConfig.GEARBOX_PRIVATE_URL;

const Favorites: React.FC = () => {
  const favoritesNetworker = new FavoritesNetworker(
    gearboxPrivateUrl as string
  );
  const favoritesStore = new FavoritesStore();
  const inventoryStore = useContext(InventoryStoreContext);
  const analyticsHandler = new AnalyticsHandler();

  const viewModel = new ViewModel(
    inventoryStore,
    favoritesStore,
    favoritesNetworker,
    analyticsHandler
  );

  return <View viewModel={viewModel} />;
};

export default Favorites;
