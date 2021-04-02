import { action, makeObservable, observable } from 'mobx';

export class LicensePlateDialogStore {
  @observable selectedVin = '';

  constructor() {
    makeObservable(this);
  }

  @action
  setSelectedVin = (vin: string): void => {
    this.selectedVin = vin;
  };
}
