import getConfig from 'next/config';
import { stringify } from 'qs';
import React from 'react';

import { VinStore } from './store';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { HomeStore } from 'src/modules/home/store';

const {
  publicRuntimeConfig: { VROOM_URL },
} = getConfig();

class VinViewModel {
  private analyticsHandler: AnalyticsHandler = new AnalyticsHandler();
  private readonly homeStore: HomeStore;
  readonly vinStore: VinStore;

  constructor(homeStore: HomeStore, vinStore: VinStore) {
    this.homeStore = homeStore;
    this.vinStore = vinStore;
  }

  readonly buttonLabel: string = "What's my car worth?";
  readonly inputPlaceholder: string = 'VIN Number';
  readonly inputLabel: string = 'Vehicle Identification Number (VIN)';
  readonly inputLabelQuestion: string = 'What’s this?';
  readonly errorMessage: string = 'Please enter a valid vin';

  handleButtonClick = (): void => {
    this.analyticsHandler.trackWhatIsMyCarWorthClicked(true);

    // FIT-566
    // Persist query string across navigation.
    // This allows vlassic attributuion to work until we can implement a better system.
    const queryString = stringify(this.homeStore.query, {
      addQueryPrefix: true,
    });
    const vitParams =
      'vit_source=texasdirectauto&vit_medium=wl&vit_dest=vroom&vit_brand=TDA';
    window.location.href = `${VROOM_URL || ''}/sell/vehicleInformation/${
      this.vinStore.vin
    }${queryString}${queryString ? '&' : '?'}${vitParams}`;
  };

  getInputValue = (): string => {
    return this.vinStore.vin;
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    this.vinStore.setVin(value);
    this.vinStore.setHasError(!this.isInputValid());
  };

  isButtonDisabled = (): boolean => {
    return !this.isVinValid();
  };

  openDialog = (): void => {
    this.vinStore.setIsDialogOpen();
  };

  hasError = (): boolean => {
    return this.vinStore.hasError;
  };

  /* Based off vroom-com TODO: Could use better validation*/
  isVinValid = (): boolean => {
    const vin = this.getInputValue();
    return vin !== '' && vin.length === 17 && this.isInputValid();
  };

  isInputValid = (): boolean => {
    const vin = this.getInputValue();
    return /^[A-Za-z0-9]+$/.test(vin);
  };
}

export default VinViewModel;
