import { PriceStore } from '../price/store';

import AppStoreNetwork from 'src/context';
import { StoreStatus } from 'src/interfaces.d';

class PriceViewModel {
  readonly placementCode = 2871300002;
  readonly category = 'sell';
  readonly placementName = 'SUYC Price';
  readonly headline = 'Switch Today and Save!';

  constructor(public store: PriceStore, public appStore: AppStoreNetwork) {}

  private get isManualPricing(): boolean {
    const {
      storeStatus,
      /* eslint-disable-next-line */
      price: { automatedAppraisal },
    } = this.store;

    return storeStatus !== StoreStatus.Initial && !automatedAppraisal;
  }

  get showProgressiveAd(): boolean {
    return this.isManualPricing && !this.appStore.store.absmart.loading;
  }

  get isInProgressiveExperiment(): boolean {
    return this.appStore.store.absmart.inPriceProgressiveTest;
  }
}

export default PriceViewModel;
