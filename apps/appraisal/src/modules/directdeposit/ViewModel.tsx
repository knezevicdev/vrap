import { DirectDepositStore, plaidSuccess } from './store';
import { OptionsStore } from './store';

import { PlaidData } from 'src/interfaces.d';

class DirectDepositViewModel {
  private readonly store: DirectDepositStore;
  private readonly oStore: OptionsStore;
  readonly bankInfo: string = 'Please provide your bank information.';
  readonly ddToggleOrCopy: string = 'Or,';
  readonly ddToggleManualCopy: string = 'enter bank information manually';
  readonly ddTogglePlaidCopy: string = 'link bank account';

  constructor(store: DirectDepositStore, oStore: OptionsStore) {
    this.store = store;
    this.oStore = oStore;
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

  onPlaidSuccess = (
    input: PlaidData,
    onPlaidSubmitting: (value: boolean) => void
  ): void => {
    plaidSuccess(input, onPlaidSubmitting);
  };

  getPlaidExperimentAssignedExperiment(): boolean {
    return this.store.plaidExperiment?.assignedVariant === 1;
  }

  togglePlaidLink = (): void => {
    this.store.togglePlaidLink();
  };
}

export default DirectDepositViewModel;
