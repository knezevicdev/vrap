import { PriceStore } from './store';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

class PriceViewModel {
  private analyticsHandler: AnalyticsHandler = new AnalyticsHandler();
  readonly status: 'loading' | 'success' | 'error';

  constructor(store: PriceStore | undefined) {
    this.status = store ? store.status : 'loading';
  }

  getStatus = (): string => {
    return this.status;
  };

  onPageLoad = (): void => {
    this.analyticsHandler.trackPriceViewed();
  };
}

export default PriceViewModel;
