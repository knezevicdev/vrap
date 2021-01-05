import { stringify } from 'qs';
import React from 'react';

import { LicensePlateStore } from './store';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { HomeStore } from 'src/modules/home/store';

class LicensePlateViewModel {
  private analyticsHandler: AnalyticsHandler = new AnalyticsHandler();
  readonly homeStore: HomeStore;
  readonly licensePlateStore: LicensePlateStore;
  private readonly states = [
    'State',
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
    return this.licensePlateStore.licensePlate;
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    this.licensePlateStore.setLicensePlate(value);
  };

  constructor(homeStore: HomeStore, licensePlateStore: LicensePlateStore) {
    this.homeStore = homeStore;
    this.licensePlateStore = licensePlateStore;
    this.licensePlateStore.setSelectedState('State');
  }

  handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    this.licensePlateStore.setSelectedState(event.target.value as string);
  };

  getStates = (): string[] => {
    return this.states;
  };

  getSelectedState = (): string => {
    return this.licensePlateStore.selectedState;
  };

  isButtonDisabled = (): boolean => {
    return (
      this.getSelectedState() === '' ||
      this.getSelectedState() === 'State' ||
      this.getInputValue() === '' ||
      this.licensePlateStore.fetching
    );
  };

  handleButtonClick = async (): Promise<void> => {
    await this.licensePlateStore.getVehicles();
    if (
      !this.licensePlateStore.fetching &&
      !this.licensePlateStore.hasError &&
      this.licensePlateStore.vehicles &&
      this.licensePlateStore.vehicles.length === 1
    ) {
      const vin = this.licensePlateStore.vehicles[0].vin;
      this.analyticsHandler.trackWhatIsMyCarWorthClicked(false);

      // FIT-566
      // Persist query string across navigation.
      // This allows vlassic attributuion to work until we can implement a better system.
      const queryString = stringify(this.homeStore.query, {
        addQueryPrefix: true,
      });
      window.location.href = `sell/vehicleInformation/${vin}${queryString}`;
    }
  };

  hasError = (): boolean => {
    return this.licensePlateStore.hasError;
  };

  getButtonLabel = (): string => {
    return this.licensePlateStore.fetching
      ? 'Finding vehicle...'
      : `What's my car worth?`;
  };
}

export default LicensePlateViewModel;
