import { ParsedUrlQuery } from 'querystring';

import { PriceStore } from '../price/store';

import { StoreStatus } from 'src/interfaces.d';
import { isMobileWebView } from 'src/networking/utils/isMobileWebView';
import Store from 'src/store';

class PriceViewModel {
  readonly placementCode = 2871300002;
  readonly category = 'sell';
  readonly eventName = 'SUYC Price Ad Clicked';

  constructor(
    public store: PriceStore,
    private query: ParsedUrlQuery,
    private appStore: Store
  ) {}

  private get isManualPricing(): boolean {
    const {
      storeStatus,
      price: { automatedAppraisal },
    } = this.store;

    return storeStatus !== StoreStatus.Initial && !automatedAppraisal;
  }

  get showProgressiveAd(): boolean {
    return (
      this.isManualPricing &&
      !isMobileWebView(this.query) &&
      this.appStore.absmart.inProgressiveTest
    );
  }
}

export default PriceViewModel;
