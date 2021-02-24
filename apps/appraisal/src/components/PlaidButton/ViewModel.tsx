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

  getPlaidExperimentAssignedExperiment = (): boolean => {
    return this.store.plaidExperiment?.assignedVariant === 1;
  };

  setInstitutionFound = (value: boolean): void => {
    this.store.setInstitutionFound(value);
  };
}

export default PlaidButtonViewModel;
