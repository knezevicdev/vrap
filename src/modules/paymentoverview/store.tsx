import { action, makeObservable, observable, runInAction } from 'mobx';
import { createContext, useContext } from 'react';

import { AsyncStatus, Store, StoreStatus } from 'src/interfaces.d';
import { Prices } from 'src/networking/models/Price';
import { Networker } from 'src/networking/Networker';

const defaultPaymentOverviewState: PaymentOverviewStoreState = {
  price: 0,
};

export interface PaymentOverviewStoreState {
  price: number;
}

export async function getInitialPaymentOverviewStoreState(
  priceId: string
): Promise<PaymentOverviewStoreState> {
  const networker = new Networker();
  try {
    const offerResponse = await networker.getOfferDetails(priceId);
    const prices: Prices = offerResponse.data;
    const price = prices.data[0];

    const optionState = {
      price: price.Price__c,
    };
    return optionState;
  } catch (err) {
    console.log('err', err);
    const errorState = defaultPaymentOverviewState;
    return errorState;
  }
}

export class PaymentOverviewStore implements Store {
  price = 0;
  storeStatus = StoreStatus.Initial;
  asyncStatus = AsyncStatus.Idle;

  constructor(priceId?: string) {
    // if (priceId) {
    //   this.init(priceId);
    // }
    this.init(priceId);

    makeObservable(this, {
      price: observable,
      storeStatus: observable,
      asyncStatus: observable,
      init: action,
    });
  }

  async init(priceId?: string): Promise<void> {
    const localPriceId = localStorage.getItem('priceId');
    let initPriceId;

    if (localPriceId) {
      initPriceId = localPriceId;
    } else {
      initPriceId = priceId || '';
    }

    const initialState = await getInitialPaymentOverviewStoreState(initPriceId);
    runInAction(() => {
      this.storeStatus = StoreStatus.Success;
      this.price = initialState.price;
    });
  }
}

export const PaymentOverviewStoreContext = createContext<PaymentOverviewStore>(
  new PaymentOverviewStore()
);

export const usePaymentOverviewStore = (): PaymentOverviewStore => {
  const store = useContext(PaymentOverviewStoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
