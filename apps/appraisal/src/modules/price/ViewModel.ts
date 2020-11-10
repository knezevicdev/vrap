import { PriceStore } from './store';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

class PriceViewModel {
  private analyticsHandler: AnalyticsHandler;
  readonly automatedAppraisal: boolean;

  constructor(store: PriceStore) {
    this.automatedAppraisal = store.automatedAppraisal;
    this.analyticsHandler = new AnalyticsHandler();
  }

  onPageLoad = (): void => {
    this.analyticsHandler.trackPriceViewed();
  };
}

export default PriceViewModel;
