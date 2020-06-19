import React from 'react';

import { LicensePlateStore } from './store';

class LicensePlateViewModel {
  readonly store: LicensePlateStore;
  private readonly states = [
    'AK',
    'AL',
    'AR',
    'AZ',
    'CA',
    'CO',
    'CT',
    'DC',
    'DE',
    'FL',
    'GA',
    'HI',
    'IA',
    'ID',
    'IL',
    'IN',
    'KS',
    'KY',
    'LA',
    'MA',
    'MD',
    'ME',
    'MI',
    'MN',
    'MO',
    'MS',
    'MT',
    'NC',
    'ND',
    'NE',
    'NH',
    'NJ',
    'NM',
    'NV',
    'NY',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VA',
    'VT',
    'WA',
    'WI',
    'WV',
    'WY',
  ];

  readonly licensePlateLabel: string = 'License plate';
  readonly error: string =
    'We could not identify the vehicle associated with this license plate. Please try again.';

  getInputValue = (): string => {
    return this.store.licensePlate;
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    this.store.setLicensePlate(value);
  };

  constructor(store: LicensePlateStore) {
    this.store = store;
  }

  handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    this.store.setSelectedState(event.target.value as string);
  };

  getStates = (): string[] => {
    return this.states;
  };

  getSelectedState = (): string => {
    return this.store.selectedState;
  };

  isButtonDisabled = (): boolean => {
    return (
      this.getSelectedState() === '' ||
      this.getInputValue() === '' ||
      this.store.fetching
    );
  };

  handleButtonClick = (): void => {
    this.store.getVehicles();
  };

  hasError = (): boolean => {
    return this.store.hasError;
  };

  getButtonLabel = (): string => {
    return this.store.fetching ? 'Finding vehicle...' : `What's my car worth?`;
  };
}

export default LicensePlateViewModel;
