import { PriceStore } from './store';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

class PriceViewModel {
  private analyticsHandler = new AnalyticsHandler();
  readonly automatedAppraisal: boolean;

  constructor(store: PriceStore) {
    this.automatedAppraisal = store.automatedAppraisal;
    this.analyticsHandler.trackPriceAccepted();
  }
}

export default PriceViewModel;
