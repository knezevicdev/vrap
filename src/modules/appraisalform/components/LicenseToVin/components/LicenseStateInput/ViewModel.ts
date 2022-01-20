import { lettersAndNumbersOnly } from '../../../formatting';
import { genericLPError } from './language';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { handleLicenseToVinApi } from 'src/modules/appraisalform/api';
import Store from 'src/store';

class LicenseToVinViewModel {
  analyticsHandler: AnalyticsHandler;

  constructor(private store: Store, private router: any) {
    this.analyticsHandler = new AnalyticsHandler();
  }

  showSpinner(value: boolean): void {
    this.store.appraisal.setShowSpinner(value);
  }

  async checkoutHandleLicenseToVin(licenseInfo: any): Promise<any> {
    try {
      const response = await handleLicenseToVinApi(licenseInfo);
      const {
        data: { vehicles },
      } = response;

      if (vehicles.length > 1) {
        this.store.appraisal.setCheckoutTrade('vehicles', vehicles);
      } else {
        this.store.appraisal.setCheckoutTrade('vehicle', vehicles[0]);
      }
      return response.data;
    } catch (e) {
      this.store.appraisal.setCheckoutTrade('error', e);
    }
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
