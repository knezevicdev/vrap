import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

export default class LicenseToVinViewModel {
  analyticsHandler: AnalyticsHandler;

  constructor() {
    this.analyticsHandler = new AnalyticsHandler();
  }

  trackVinClicked(): void {
    const label = 'Vin';
    const category = 'Sell';

    this.analyticsHandler.trackLicenseToVin(label, category);
  }
}
