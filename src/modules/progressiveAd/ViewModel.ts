import { PriceStore } from '../price/store';

import { StoreStatus } from 'src/interfaces.d';

class PriceViewModel {
  constructor(public store: PriceStore) {}

  private get isManualPricing(): boolean {
    const {
      storeStatus,
      /* eslint-disable-next-line */
      price: { automatedAppraisal },
    } = this.store;

    return storeStatus !== StoreStatus.Initial && !automatedAppraisal;
  }

  get showProgressiveAd(): boolean {
    return this.isManualPricing;
  }
}

export default PriceViewModel;
