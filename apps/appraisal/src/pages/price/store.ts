import { observable, decorate } from 'mobx';
import { PriceStatus } from './ViewModel';
import { Networker } from 'src/networking/Networker';

export interface PriceStoreState {
  priceStatus: PriceStatus;
  price: number;
}

export async function getInitialPriceStoreState(priceId: string): Promise<PriceStoreState> {
  const initialState: PriceStoreState = {
    priceStatus: PriceStatus.INITIAL,
    price: 0
  };

  const networker = new Networker();
  try {
    const response = await networker.getOfferDetails(priceId);
    const prices: any = response.data;
    const price = prices[0];

    console.log({price});
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
})
