import { ParsedUrlQuery } from 'querystring';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { isMobileWebView } from 'src/networking/utils/isMobileWebView';
import { AppStore } from 'src/store/appStore';

class CongratulationsViewModel {
  readonly placementCode = 2871300002;
  readonly category = 'sell';
  readonly eventName = 'SUYC Congrats Ad Clicked';

  private analyticsHandler: AnalyticsHandler;
  private query: ParsedUrlQuery;
  private appStore: AppStore;

  constructor(
    analyticsHandler: AnalyticsHandler,
    query: ParsedUrlQuery,
    appStore: AppStore
  ) {
    this.analyticsHandler = analyticsHandler;
    this.query = query;
    this.appStore = appStore;
  }

  onPageLoad = (): void => {
    this.analyticsHandler.trackCongratsViewed();
  };

  get showProgressiveAd(): boolean {
    return !isMobileWebView(this.query) && this.appStore.inProgressiveTest;
  }
}

export default CongratulationsViewModel;
