import { PriceStore } from './store';

export enum PriceStatus {
  INITIAL = 'initial',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  REASON_SUBMITTED = 'reasonSubmitted',
  EXPIRED = 'expired',
}

class PriceViewModel {
  readonly priceStatus: PriceStatus;

  constructor(store: PriceStore) {
    this.priceStatus = store.priceStatus;
  }
}

export default PriceViewModel;
