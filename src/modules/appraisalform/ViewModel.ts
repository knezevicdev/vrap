import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import Store from 'src/store';

class PriceViewModel {
  private _analyticsHandler: AnalyticsHandler = new AnalyticsHandler();

  constructor(public store: Store) {}

  onPageLoad = (): void => {
    this._analyticsHandler.trackPriceViewed();
  };

  get getAnalyticHandler(): AnalyticsHandler {
    return this._analyticsHandler;
  }
}

export default PriceViewModel;
