import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

class PendingPriceViewModel {
  private analyticsHandler: AnalyticsHandler;

  readonly sitTight: string = 'sit tight';
  readonly findCar: string = 'find your next car';
  readonly takingALook: string =
    'Our buying specialists are taking a closer look and will send your price by email in one business day.';
  readonly spamFolder: string = 'Please be sure to check your spam folder.';

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
}

export default PendingPriceViewModel;
