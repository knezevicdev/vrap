import { ParsedUrlQuery } from 'querystring';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { isMobileWebView } from 'src/networking/utils/isMobileWebView';
import Store from 'src/store';

class CongratulationsViewModel {
  readonly placementCode = 2871300002;
  readonly category = 'sell';
  readonly eventName = 'SUYC Congrats Ad Clicked';

  private analyticsHandler: AnalyticsHandler;
  private query: ParsedUrlQuery;
  private appStore: Store;

  constructor(
    analyticsHandler: AnalyticsHandler,
    query: ParsedUrlQuery,
    appStore: Store
  ) {
    this.analyticsHandler = analyticsHandler;
    this.query = query;
    this.appStore = appStore;
  }

  onPageLoad = (): void => {
    this.analyticsHandler.trackCongratsViewed();
  };

  get showProgressiveAd(): boolean {
    return (
      !isMobileWebView(this.query) && this.appStore.absmart.inProgressiveTest
    );
  }
}

export default CongratulationsViewModel;
