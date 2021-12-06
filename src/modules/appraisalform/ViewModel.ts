import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import Store from 'src/store';

class PriceViewModel {
  private analyticsHandler: AnalyticsHandler = new AnalyticsHandler();

  constructor(public store: Store) {}

  onPageLoad = (): void => {
    this.analyticsHandler.trackPriceViewed();
  };

  get getAnalyticHandler(): AnalyticsHandler {
    return this.analyticsHandler;
  }
}

export default PriceViewModel;
