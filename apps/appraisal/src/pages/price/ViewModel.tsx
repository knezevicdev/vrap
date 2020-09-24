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
    this.store = store;
    this.priceStatus = PriceStatus.INITIAL;
  }
}

export default PriceViewModel;
