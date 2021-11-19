import { OptionsStore } from '../../modules/options/store';

import AppStore from 'src/store';

class PlaidButtonViewModel {
  private readonly store: OptionsStore;
  readonly buttonCopy: string = 'Link bank account';
  readonly buttonStartCopy: string = 'Start direct deposit';

  constructor(private appStore: AppStore, store: OptionsStore) {
    this.store = store;
  }

  onPlaidSubmitting = (value: boolean): void => {
    this.store.setPlaidSubmitting(value);
  };

  getPlaidSubmitting = (): boolean => {
    return this.store.plaidSubmitting;
  };

  getEmail = (): string => {
    return this.store.email;
  };

  setInstitutionFound = (value: boolean): void => {
    this.store.setInstitutionFound(value);
  };

  setInstitutionSearched = (value: boolean): void => {
    this.store.setInstitutionSearched(value);
  };

  getInstitutionSearched = (): boolean => {
    return this.store.institutionSearched;
  };

  isPaymentRequireExp = (): boolean => {
    return this.appStore.absmart.isInExperiment('ac-payment-required');
  };
}

export default PlaidButtonViewModel;
