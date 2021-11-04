import { ABSmartlyModel } from '@vroom-web/absmartly-integration';
import { makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';

export class ABSmartStore {
  abSmartlyModel?: ABSmartlyModel;
  stepperAbTest = false;
  abTestFacelift = false;
  offerFacelift = false;
  inProgressiveTest = false;
  paymentRequired = false;
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  setABSmartlyModel(abSmartlyModel: ABSmartlyModel): void {
    this.abSmartlyModel = abSmartlyModel;
  }

  setABSmartTest = (value: boolean): void => {
    this.stepperAbTest = value;
  };

  setFaceliftAbTest = (value: boolean): void => {
    this.abTestFacelift = value;
  };

  setOfferFacelift = (value: boolean): void => {
    this.offerFacelift = value;
  };

  setProgressiveTest = (value: boolean): void => {
    this.inProgressiveTest = value;
  };

  setPaymentRequired = (value: boolean): void => {
    this.paymentRequired = value;
  };

  setLoading = (value: boolean): void => {
    this.loading = value;
  };
}

export const AppStoreContext = createContext<ABSmartStore>(new ABSmartStore());

export const useAppStore = (): ABSmartStore => {
  const store = useContext(AppStoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
