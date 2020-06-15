import React from 'react';

import { VinStore } from './store';

class VinViewModel {
  private readonly store: VinStore;

  constructor(store: VinStore) {
    this.store = store;
  }

  readonly buttonLabel: string = "What's my car worth?";
  readonly inputPlaceholder: string = 'VIN Number';
  readonly inputLabel: string = 'Vehicle Identification Number (VIN)';

  navigate(): void {
    window.location.href = `sell/vehicleInformation/${this.store.vin}`;
  }

  getInputValue = (): string => {
    return this.store.vin;
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    this.store.setVin(value);
  };

  isButtonDisabled = (): boolean => {
    return this.getInputValue() === '' || !this.isVinValid();
  };

  /*
        Based off vroom-com
        TODO: Could use better validation
    */
  isVinValid = (): boolean => {
    const vin = this.getInputValue();
    return vin.length === 17 && /^[A-Za-z0-9]+$/.test(vin);
  };
}

export default VinViewModel;
