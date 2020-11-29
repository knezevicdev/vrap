import { PriceStore } from './store';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

class PriceViewModel {
  private analyticsHandler: AnalyticsHandler = new AnalyticsHandler();
  readonly store: PriceStore;

  constructor(store: PriceStore) {
    this.store = store;
  }

  getStatus = (): string => {
    return this.store.status;
  };

  getAutomated = (): boolean => {
    return this.store.price.automatedAppraisal;
  };

  onPageLoad = (): void => {
    this.analyticsHandler.trackPriceViewed();
  };
}

export default PriceViewModel;
