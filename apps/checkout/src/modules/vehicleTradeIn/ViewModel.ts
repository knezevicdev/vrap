import Model from './Model';
import { action, makeObservable, observable } from 'mobx';
export default class VehicleTradeInViewModel {
  model: Model;
  isOpen = false;

  constructor(model: Model) {
    this.model = model;
    makeObservable(this, {
      isOpen: observable,
      setIsOpen: action
    });
  }
  openDialog = (): void => {
    this.setIsOpen(true);
  };
  setIsOpen = (isOpen: boolean): void => {
    this.isOpen = isOpen;
  };

  closeDialog = (): void => {
    this.setIsOpen(false);
  };

  getIsOpen = (): boolean => {
    return this.isOpen;
  };

 
}
