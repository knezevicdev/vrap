import { StoreStatus } from 'src/interfaces.d';
import { PriceStore } from 'src/modules/price/store';

class PriceDetailViewModel {
  constructor(public store: PriceStore) {}

  get status(): StoreStatus {
    return this.store.storeStatus;
  }

  get automated(): boolean {
    return this.store.price.automatedAppraisal;
  }
}

export default PriceDetailViewModel;
