import { DirectDepositStore } from './store';

class DirectDepositViewModel {
  private readonly store: DirectDepositStore;
  readonly bankInfo: string = 'Please provide your bank information.';
  readonly routingLabel: string = 'Routing Number';
  readonly bankAccountLabel: string = 'Bank Account Number';

  constructor(store: DirectDepositStore) {
    this.store = store;
  }

  getPlaidLinkToken = (): string => {
    return this.store.linkToken;
  };

  getShowPlaidLink = (): boolean => {
    return this.store.showPlaidLink;
  }

  togglePlaidLink = (): void => {
    this.store.togglePlaidLink();
  }
}

export default DirectDepositViewModel;
