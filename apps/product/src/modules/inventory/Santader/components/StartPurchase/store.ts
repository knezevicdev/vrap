import { action, observable } from 'mobx';

export class StartPurchaseStore {
  @observable showRedirect = false;

  @action
  setShowRedirectToTrue = (): void => {
    this.showRedirect = true;
  };
}
