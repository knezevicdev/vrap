import { action, observable } from 'mobx';

export class VinStore {
  @observable vin = '';
  @observable isDialogOpen = false;

  @action
  setVin = (vin: string): void => {
    this.vin = vin;
  };

  @action
  setIsDialogOpen = (): void => {
    this.isDialogOpen = !this.isDialogOpen;
  }
}
