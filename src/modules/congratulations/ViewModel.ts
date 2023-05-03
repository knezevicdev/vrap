import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

class CongratulationsViewModel {
  private _analyticsHandler: AnalyticsHandler;

  constructor(analyticsHandler: AnalyticsHandler) {
    this._analyticsHandler = analyticsHandler;
  }

  onPageLoad = (): void => {
    this._analyticsHandler.trackCongratsViewed();
  };
}

export default CongratulationsViewModel;
