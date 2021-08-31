import { action, makeObservable, observable, runInAction } from 'mobx';
import { createContext, useContext } from 'react';

import { AsyncStatus, Store, StoreStatus } from 'src/interfaces.d';
import { Prices } from 'src/networking/models/Price';
import { getOfferDetails } from 'src/networking/request';

const defaultPaymentOverviewState: PaymentOverviewStoreState = {
  price: 0,
  detail: {
    maker: '',
    model: '',
    trim: '',
    year: 0,
    miles: 0,
  },
};

export interface DetailProp {
  maker: string;
  model: string;
  trim: string;
  year: number;
  miles: number;
}

export interface PaymentOverviewStoreState {
  price: number;
  detail: DetailProp;
}

export async function getInitialPaymentOverviewStoreState(
  priceId: string
): Promise<PaymentOverviewStoreState> {
  try {
    const offerResponse = await getOfferDetails(priceId);
    const prices: Prices = offerResponse.data;
    const price = prices.data[0];

    const optionState = {
      price: price.Price__c,
      detail: {
        maker: price.Make__c,
        model: price.Model__c,
        trim: price.Trim__c,
        year: price.Year__c,
        miles: price.miles,
      },
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
  detail = {
    maker: '',
    model: '',
    trim: '',
    year: 0,
    miles: 0,
  };
  storeStatus = StoreStatus.Initial;
  asyncStatus = AsyncStatus.Idle;

  constructor() {
    makeObservable(this, {
      price: observable,
      storeStatus: observable,
      asyncStatus: observable,
      detail: observable,
      init: action,
    });
  }

  async init(priceId: string): Promise<void> {
    const localPriceId = localStorage.getItem('priceId');

    priceId = localPriceId || priceId;

    if (priceId === undefined) {
      return;
    }

    const initialState = await getInitialPaymentOverviewStoreState(priceId);
    runInAction(() => {
      this.storeStatus = StoreStatus.Success;
      this.price = initialState.price;
      this.detail = { ...initialState.detail };
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
