import { PriceStore } from '../price/store';

import { StoreStatus } from 'src/interfaces.d';

class PriceViewModel {
  readonly placementCode = 2871300002;
  readonly category = 'sell';
  readonly placementName = 'SUYC Price';

  constructor(public store: PriceStore) {}

  private get isManualPricing(): boolean {
    const {
      storeStatus,
      price: { automatedAppraisal },
    } = this.store;

    return storeStatus !== StoreStatus.Initial && !automatedAppraisal;
  }

  get showProgressiveAd(): boolean {
    return this.isManualPricing;
  }
}

export default PriceViewModel;
