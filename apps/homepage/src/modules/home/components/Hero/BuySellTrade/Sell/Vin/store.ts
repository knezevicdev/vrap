import { action, observable } from 'mobx';

export class VinStore {
  @observable vin = '';
  @observable isDialogOpen = false;
  @observable hasError = false;

  @action
  setVin = (vin: string): void => {
    this.vin = vin;
  };

  @action
  setIsDialogOpen = (): void => {
    this.isDialogOpen = !this.isDialogOpen;
  }

  @action
  setHasError = (hasError: boolean): void => {
    this.hasError = hasError;
  };
}
