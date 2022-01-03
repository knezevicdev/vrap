import { isErrorResponse } from '@vroom-web/networking';

import {
  trackLicenseToVin,
  trackSelectYourVehicle,
} from '../../../../lib/analytics/appraisal';
import { genericLPError, licenseToVinErrorText } from './language';

import { handleLicenseToVinApi } from 'src/modules/appraisalform/api';
import {
  getThemedPath,
  PATHS,
} from 'src/modules/appraisalform/constants/routes';
import Store from 'src/store';

class LicenseToVinViewModel {
  constructor(private store: Store, private history: any) {}

  async handleLicenseToVin(licenseInfo: any): Promise<any> {
    try {
      const response = await handleLicenseToVinApi(licenseInfo);
      const {
        data: { vehicles },
      } = response;

      if (vehicles.length > 1) {
        this.store.appraisal.setVehicles(vehicles);
      } else {
        this.store.appraisal.setVehicle(vehicles[0]);
      }
      return response.data;
    } catch (e) {
      this.store.appraisal.setVehicleError(e);
    }
  }

  showSpinner(value: boolean): void {
    this.store.appraisal.setShowSpinner(value);
  }

  // showDialog(dialogType, dialogProps, overlayCanHide) {
  //   if (dialogType != 'PanelsDialog') {
  //     document.body.classList.add('body-noscroll-class');
  //     document.documentElement.classList.add('body-noscroll-class');
  //   }
  //   return {
  //     type: SHOW_DIALOG,
  //     dialogType,
  //     dialogProps,
  //     overlayCanHide,
  //   };
  // }

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

  async handleLicenseStateSubmit(
    pathname: string,
    licensePlate: any,
    state: any
  ): Promise<void> {
    const { showLicenseError, setLicenseError } = this.store.appraisal;
    this.showSpinner(true);
    const data = {
      licensePlate: licensePlate.value,
      state: state.value,
    };

    const label = 'License Plate';
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
    const licenseToVinFunc =
      pathname === PATHS.checkoutTradeAppraisal.prefix
        ? this.checkoutHandleLicenseToVin
        : this.handleLicenseToVin;
    try {
      const vinResponse = await licenseToVinFunc(data);
      this.showSpinner(false);

      if (isErrorResponse(vinResponse) && showLicenseError) {
        // this.showDialog('UseVinDialog', { handleTabClick });
      } else if (isErrorResponse(vinResponse)) {
        licensePlate.onChange({
          ...licensePlate,
          error: true,
          errorMessage: licenseToVinErrorText,
        });
        setLicenseError(true);
      } else if (vinResponse.vehicles.length > 1) {
        trackSelectYourVehicle(category);
        const isCheckoutTrade =
          pathname === PATHS.checkoutTradeAppraisal.prefix;
        // this.showDialog('MultiSelectDialog', {
        //   isCheckoutTrade,
        // });
      } else if (vinResponse.vehicles[0].vin) {
        const vinForPath = vinResponse.vehicles[0].vin;
        let appraisalPath = '';
        if (pathname === PATHS.checkoutTradeAppraisal.prefix) {
          appraisalPath = PATHS.checkoutTradeAppraisal.withParams({
            vin: vinForPath,
          });
        } else if (pathname === PATHS.trade.prefix) {
          appraisalPath = PATHS.tradeAppraisal.withParams({ vin: vinForPath });
        } else {
          appraisalPath = getThemedPath(
            PATHS.sellAppraisal.withParams({ vin: vinForPath }),
            theme
          );
        }
        this.history.push(appraisalPath);
      } else {
        licensePlate.onChange({
          ...licensePlate,
          error: true,
          errorMessage: genericLPError,
        });
        setLicenseError(true);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default LicenseToVinViewModel;
