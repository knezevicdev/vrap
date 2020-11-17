import { action, observable, runInAction } from 'mobx';
import { createContext, useContext } from 'react';

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

export class PaymentOverviewStore {
  @observable price = 0;
  @observable isDesktop;
  @observable displayBody = true;

  constructor(priceId?: string, isDeskTop = true) {
    this.isDesktop = isDeskTop;
    this.displayBody = isDeskTop;
    if (priceId) this.init(priceId);
  }

  @action
  async init(priceId: string): Promise<void> {
    const initialState = await getInitialPaymentOverviewStoreState(priceId);
    runInAction(() => {
      this.price = initialState.price;
    });
  }

  @action
  setDisplayBody = (display: boolean): void => {
    this.displayBody = display;
  };
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
