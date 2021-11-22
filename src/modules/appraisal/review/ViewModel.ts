import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import Store from 'src/store';

export default class VerificationReviewSectionViewModel {
  private _analyticsHandler: AnalyticsHandler = new AnalyticsHandler();

  readonly title: string = 'my appraisal review';

  constructor(private _store: Store) {}

  onPageLoad(): void {
    this._analyticsHandler.trackVerificationReviewViewed();
  }

  getAnalyticHandler(): AnalyticsHandler {
    return this._analyticsHandler;
  }
}
