import { PriceStore, PriceStoreStatus } from 'src/modules/price/store';

class PriceDetailViewModel {
  constructor(public store: PriceStore) {}

  get status(): PriceStoreStatus {
    return this.store.status;
  }

  get automated(): boolean {
    return this.store.price.automatedAppraisal;
  }
}

export default PriceDetailViewModel;
