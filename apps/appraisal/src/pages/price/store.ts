import { observable, decorate } from 'mobx';
import { PriceStatus } from './ViewModel';
import { Networker, Status } from '../networking/Networker';

export interface PriceStoreState {
  priceStatus: PriceStatus;
  price: number;
}

export async function getInitialPriceStoreState(): Promise<PriceStoreState> {
  const initState: PriceStoreState = {
    isAvailable: PriceStatus.INITIAL
  };

  const networker = new Networker();
  try {
    const response = await networker.getOfferDetails(vin);
    initialState.priceStatus = response.priceStatus;
    initialState.price = response.price;
  } catch (err) {
    initialState.priceStatus = 'initial';
    initialState.price = 1000;
  }

  return initState;
}

export class PriceStore {
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
})
