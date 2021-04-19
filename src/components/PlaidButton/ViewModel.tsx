import { OptionsStore } from '../../modules/options/store';

class PlaidButtonViewModel {
  private readonly store: OptionsStore;
  readonly buttonCopy: string = 'Link bank account';
  readonly buttonStartCopy: string = 'Start direct deposit';

  constructor(store: OptionsStore) {
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
}

export default PlaidButtonViewModel;
