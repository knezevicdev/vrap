import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

class PendingPriceViewModel {
  private analyticsHandler: AnalyticsHandler;

  readonly sitTight: string = 'sit tight';
  readonly findCar: string = 'find your next car';
  readonly takingALook: string =
    'Our buying specialists are taking a closer look and we will provide you a guranteed offer in one business day.';

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
