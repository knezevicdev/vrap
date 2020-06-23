import React from 'react';

import { VinStore } from './store';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

class VinViewModel {
  private analyticsHandler: AnalyticsHandler = new AnalyticsHandler();
  readonly store: VinStore;

  constructor(store: VinStore) {
    this.store = store;
  }

  readonly buttonLabel: string = "What's my car worth?";
  readonly inputPlaceholder: string = 'VIN Number';
  readonly inputLabel: string = 'Vehicle Identification Number (VIN)';
  readonly inputLabelQuestion: string = 'What’s this?';
  readonly errorMessage: string = 'Please enter a valid vin';

  handleButtonClick = (): void => {
    this.analyticsHandler.trackWhatIsMyCarWorthClicked(true);
    window.location.href = `sell/vehicleInformation/${this.store.vin}`;
  };

  getInputValue = (): string => {
    return this.store.vin;
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    this.store.setVin(value);
    this.store.setHasError(!this.isInputValid());
  };

  isButtonDisabled = (): boolean => {
    return this.getInputValue() === '' || !this.isVinValid();
  };

  openDialog = (): void => {
    this.store.setIsDialogOpen();
  };

  hasError = (): boolean => {
    return this.store.hasError;
  };

  /* Based off vroom-com TODO: Could use better validation*/
  isVinValid = (): boolean => {
    const vin = this.getInputValue();
    return vin.length === 17 && this.isInputValid();
  };

  isInputValid = (): boolean => {
    const vin = this.getInputValue();
    return /^[A-Za-z0-9]+$/.test(vin);
  };
}

export default VinViewModel;
