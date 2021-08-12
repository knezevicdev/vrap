import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

class CongratulationsViewModel {
  private analyticsHandler: AnalyticsHandler;

  constructor(analyticsHandler: AnalyticsHandler) {
    this.analyticsHandler = analyticsHandler;
  }

  onPageLoad = (): void => {
    this.analyticsHandler.trackCongratsViewed();
  };
}

export default CongratulationsViewModel;
