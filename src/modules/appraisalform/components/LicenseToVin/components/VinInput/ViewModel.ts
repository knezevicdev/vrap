import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

export default class LicenseToVinViewModel {
  analyticsHandler: AnalyticsHandler;

  constructor(private router: any) {
    this.analyticsHandler = new AnalyticsHandler();
  }

  trackVinClicked(pathname: string, vinForPath: string): void {
    const appraisalPath = `/appraisal?vehicle=${vinForPath}`;
    const label = 'Vin';
    const category = 'Sell';

    this.analyticsHandler.trackLicenseToVin(label, category);

    this.router.push(appraisalPath);
  }
}
