import { decorate, observable } from 'mobx';
import { createContext, useContext } from 'react';

import { PriceStatus } from './ViewModel';

import { Prices } from 'src/networking/models/Price';
import { Networker } from 'src/networking/Networker';

export interface PriceStoreState {
  priceStatus: PriceStatus;
  price: number;
}

export async function getInitialPriceStoreState(
  priceId: string
): Promise<PriceStoreState> {
  const initialState: PriceStoreState = {
    priceStatus: PriceStatus.INITIAL,
    price: 0,
  };

  const networker = new Networker();
  try {
    const response = await networker.getOfferDetails(priceId);
    const prices: Prices = response.data;
    const price = prices.data[0];
    console.log(price);

    initialState.priceStatus = price.offer_status;
    initialState.price = price.Price__c;
  } catch (err) {
    initialState.priceStatus = PriceStatus.INITIAL;
    initialState.price = 0;
  }

  return initialState;
}

export class PriceStore {
  priceStatus = PriceStatus.INITIAL;
  price = 0;

  constructor(initialState?: PriceStoreState) {
    if (initialState) {
      this.priceStatus = initialState.priceStatus;
      this.price = initialState.price;
    }
  }
}

decorate(PriceStore, {
  priceStatus: observable,
  price: observable,
});

const PriceStoreContext = createContext<PriceStore>(new PriceStore());

export const usePriceStore = () => {
  const store = useContext(PriceStoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
