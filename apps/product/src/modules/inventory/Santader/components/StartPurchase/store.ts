import { action, observable } from 'mobx';

export class Store {
  @observable showRedirect = false;

  @action
  setShowRedirectToTrue = (): void => {
    this.showRedirect = true;
  };
}
