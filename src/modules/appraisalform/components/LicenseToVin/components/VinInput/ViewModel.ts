import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import Store from 'src/store';

export default class LicenseToVinViewModel {
  analyticsHandler: AnalyticsHandler;
  constructor(private _store: Store) {
    this.analyticsHandler = new AnalyticsHandler();
  }

  trackVinClicked(): void {
    const label = 'Vin';
    this.analyticsHandler.trackLicenseToVin(
      label,
      this._store.appraisal.eventCategory
    );
  }
}
