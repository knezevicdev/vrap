import { DirectDepositStore, plaidSuccess } from './store';

import { PlaidData } from 'src/interfaces.d';

class DirectDepositViewModel {
  private readonly store: DirectDepositStore;
  readonly bankInfo: string = 'Please provide your bank information.';
  readonly ddToggleOrCopy: string = 'Or,';
  readonly ddToggleManualCopy: string = 'enter bank information manually';
  readonly ddTogglePlaidCopy: string = 'link bank account';

  constructor(store: DirectDepositStore) {
    this.store = store;
  }

  getPlaidLinkToken = (): string => {
    return this.store.linkToken;
  };

  getShowPlaidLink = (): boolean => {
    return this.store.showPlaidLink;
  };

  getPriceId = (): string => {
    return this.store.priceId;
  };

  togglePlaidLink = (): void => {
    this.store.togglePlaidLink();
  };

  onPlaidSuccess = (input: PlaidData, onPlaidSubmitting: void): void => {
    plaidSuccess(input, onPlaidSubmitting);
  };
}

export default DirectDepositViewModel;
