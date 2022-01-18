import { getThemedPath, PATHS } from '../../../../constants/routes';
import { trackLicenseToVin } from '../../../../lib/analytics/appraisal';

export default class LicenseToVinViewModel {
  constructor(private history: any) {}

  trackVinClicked(pathname: string, vinForPath: string): void {
    let appraisalPath;

    switch (pathname) {
      case PATHS.checkoutTradeAppraisal.prefix:
        appraisalPath = PATHS.checkoutTradeAppraisal.withParams({
          vin: vinForPath,
        });
        break;
      case PATHS.trade.prefix:
        appraisalPath = PATHS.tradeAppraisal.withParams({
          vin: vinForPath,
        });
        break;
      default:
        appraisalPath = getThemedPath(
          PATHS.sellAppraisal.withParams({
            vin: vinForPath,
          }),
          theme
        );
        break;
    }
    const label = 'Vin';
    let category = '';
    switch (pathname) {
      case PATHS.dealCongratulations.prefix:
        category = 'Ecommerce';
        break;
      case PATHS.checkoutTradeAppraisal.prefix:
        category = 'Trade';
        break;
      default:
        category = 'sell';
        break;
    }

    trackLicenseToVin(label, category);

    this.history.push(appraisalPath);
  }
}
