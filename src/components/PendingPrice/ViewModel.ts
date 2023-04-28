import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

class PendingPriceViewModel {
  private analyticsHandler: AnalyticsHandler;

  constructor() {
    this.analyticsHandler = new AnalyticsHandler();
  }

  onPageLoad = (): void => {
    this.analyticsHandler.trackNoPrice();
  };

  handleFindCar(): void {
    const url = `/cars`;
    window.location.href = url;
  }

  get getAnalyticsHandler(): AnalyticsHandler {
    return this.analyticsHandler;
  }
}

export default PendingPriceViewModel;
