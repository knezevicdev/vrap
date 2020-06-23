import React from 'react';

import { LicensePlateStore } from '../store';
import { LicensePlateDialogStore } from './store';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

class LicensePlateDialogViewModel {
  private analyticsHandler: AnalyticsHandler = new AnalyticsHandler();
  private readonly licensePlateStore: LicensePlateStore;
  private readonly licensePlateDialogStore: LicensePlateDialogStore;
  readonly title: string = `which car are you looking to sell?`;
  readonly buttonLabel: string = 'Next';

  constructor(
    licensePlateStore: LicensePlateStore,
    licensePlateDialogStore: LicensePlateDialogStore
  ) {
    this.licensePlateStore = licensePlateStore;
    this.licensePlateDialogStore = licensePlateDialogStore;
  }

  isOpen = (): boolean => {
    return this.licensePlateStore.isDialogOpen;
  };

  handleClose = (): void => {
    this.licensePlateStore.setIsDialogOpen();
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.licensePlateDialogStore.setSelectedVin(event.target.value);
  };

  getVehicles = (): { vin: string; vehicle: string }[] => {
    if (this.licensePlateStore.vehicles) {
      return this.licensePlateStore.vehicles.map((vehicle) => {
        return {
          vin: vehicle.vin,
          vehicle: `${vehicle.modelYear} ${vehicle.make}`,
        };
      });
    }
    return [];
  };

  isRadioCheck = (vin: string): boolean => {
    return this.licensePlateDialogStore.selectedVin === vin;
  };

  handleButtonClick = (): void => {
    this.analyticsHandler.trackWhatIsMyCarWorthClicked(false);
    window.location.href = `sell/vehicleInformation/${this.licensePlateDialogStore.selectedVin}`;
  };

  isButtonDisabled = (): boolean => {
    return this.licensePlateDialogStore.selectedVin === '';
  };
}

export default LicensePlateDialogViewModel;
