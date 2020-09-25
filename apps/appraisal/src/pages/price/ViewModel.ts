import { PriceStore } from './store.ts';

export enum PriceStatus {
  INITIAL = 'initial',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  REASON_SUBMITTED = 'reasonSubmitted',
  EXPIRED = 'expired'
};

class PriceViewModel {
  readonly store: PriceStore;

  constructor(store: PriceStore) {
    this.priceStatus = store.PriceStatus;
    this.price = store.price;
  }
}

export default PriceViewModel;
