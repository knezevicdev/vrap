import { createContext, useContext } from 'react';

import Store from 'src/store';

export default class AppStoreNetwork {
  store = new Store();
}

export const AppStoreNetworkContext = createContext<AppStoreNetwork>(
  new AppStoreNetwork()
);

export const useAppStore = (): AppStoreNetwork => {
  const context = useContext(AppStoreNetworkContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return context;
};
