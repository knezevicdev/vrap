import { PriceStore } from './store';

export enum PriceStatus {
  INITIAL = 'initial',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  REASON_SUBMITTED = 'reasonSubmitted',
  EXPIRED = 'expired',
}

class PriceViewModel {
  priceStatus = PriceStatus.INITIAL;
  price = 0;

  constructor(store: PriceStore) {
    this.priceStatus = store.priceStatus;
    this.price = store.price;
  }
}

export default PriceViewModel;
