import { createContext, useContext } from 'react';

import { ABSmartStore } from './abSmartStore';
import { VerificationStore } from './verificationStore';

export default class Store {
  absmart = new ABSmartStore();
  verification = new VerificationStore();
}

export const StoreContext = createContext<Store>(new Store());

export const useAppStore = (): Store => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
