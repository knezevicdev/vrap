import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

class CongratulationsViewModel {
  readonly placementCode = 2871300002;
  readonly category = 'sell';
  readonly placementName = 'SUYC Congrats';
  readonly headline = 'Switch Today and Save!';

  private _analyticsHandler: AnalyticsHandler;

  constructor(analyticsHandler: AnalyticsHandler) {
    this._analyticsHandler = analyticsHandler;
  }

  onPageLoad = (): void => {
    this._analyticsHandler.trackCongratsViewed();
  };
}

export default CongratulationsViewModel;
