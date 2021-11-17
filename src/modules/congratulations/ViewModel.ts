import AppStoreNetwork from 'src/context';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

class CongratulationsViewModel {
  readonly placementCode = 2871300002;
  readonly category = 'sell';
  readonly placementName = 'SUYC Congrats';
  readonly headline = 'Switch Today and Save!';

  private _analyticsHandler: AnalyticsHandler;
  private _appStore: AppStoreNetwork;

  constructor(analyticsHandler: AnalyticsHandler, appStore: AppStoreNetwork) {
    this._analyticsHandler = analyticsHandler;
    this._appStore = appStore;
  }

  onPageLoad = (): void => {
    this._analyticsHandler.trackCongratsViewed();
  };

  get isInExperiment(): boolean | undefined {
    /* eslint-disable-next-line */
    const { isABSmartlyLoading, isInExperiment } = this._appStore.store.absmart;
    if (isABSmartlyLoading) return;
    return isInExperiment('vadd-progressive-ad-suyc-congrats-v2');
  }
}

export default CongratulationsViewModel;
