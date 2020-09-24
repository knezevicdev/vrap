import { observable } from 'mobx';
import { PriceStatus } from './ViewModel';

export interface PriceStoreState {
  priceStatus: PriceStatus;
}

export async function getInitialPriceStoreState(): Promise<PriceStoreState> {
  const initState: PriceStoreState = {
    isAvailable: PriceStatus.INITIAL
  };

  try {
  } catch (err) {
  }

  return initState;
}

export class PriceStore {
  @observable priceStatus: PriceStatus = 'initial';

  constructor(initialState?: PriceStoreState) {
    if (initialState) {
      this.priceStatus = initialState.priceStatus;
    }
  }
}
