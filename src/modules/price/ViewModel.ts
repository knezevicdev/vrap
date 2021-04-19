import { PriceStore } from './store';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

class PriceViewModel {
  private analyticsHandler: AnalyticsHandler = new AnalyticsHandler();

  constructor(public store: PriceStore) {}

  onPageLoad = (): void => {
    this.analyticsHandler.trackPriceViewed();
  };
}

export default PriceViewModel;
