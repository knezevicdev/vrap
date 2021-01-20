import { action, observable } from 'mobx';

export class LicensePlateDialogStore {
  @observable selectedVin = '';

  @action
  setSelectedVin = (vin: string): void => {
    this.selectedVin = vin;
  };
}
