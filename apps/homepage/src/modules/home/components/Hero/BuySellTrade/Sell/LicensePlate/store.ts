import { action, observable } from 'mobx';

export class LicensePlateStore {
  @observable selectedState = '';
  @observable licensePlate = '';

  @action
  setSelectedState = (state: string): void => {
    this.selectedState = state;
  };

  @action
  setLicensePlate = (licensePlate: string): void => {
    this.licensePlate = licensePlate;
  };
}
