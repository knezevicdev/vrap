import { createContext, useContext } from 'react';

import { Networker } from 'src/networking/Networker';
import Store from 'src/store';

export default class AppStoreNetwork {
  network = new Networker();
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
