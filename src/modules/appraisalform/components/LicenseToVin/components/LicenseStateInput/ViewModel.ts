import { lettersAndNumbersOnly } from '../../../formatting';
import { genericLPError } from './language';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import Store from 'src/store';

class LicenseToVinViewModel {
  analyticsHandler: AnalyticsHandler;

  constructor(private store: Store, private router: any) {
    this.analyticsHandler = new AnalyticsHandler();
  }

  showSpinner(value: boolean): void {
    this.store.appraisal.setShowSpinner(value);
  }

  handleLicenseStateSubmit(licensePlate: any, state: any): void {
    this.showSpinner(true);
    const lpForPath = `${state.value}-${lettersAndNumbersOnly(
      licensePlate.value
    )}`;

    const label = 'License Plate';
    const category = 'Sell';

    this.analyticsHandler.trackLicenseToVin(label, category);
    this.showSpinner(false);

    if (!licensePlate.error) {
      const appraisalPath = `/appraisal?vehicle=${lpForPath}`;
      this.router.push(appraisalPath);
    } else {
      licensePlate.onChange({
        ...licensePlate,
        error: true,
        errorMessage: genericLPError,
      });
    }
  }
}

export default LicenseToVinViewModel;
