import { isErrorResponse } from '@vroom-web/networking';

import { OptionsStore } from '../../modules/options/store';

import { getInstitutionLogo } from 'src/networking/request';
import Store from 'src/store';

class PlaidButtonViewModel {
  // private readonly store: OptionsStore;
  readonly buttonCopy: string = 'Link bank account';
  readonly buttonStartCopy: string = 'Start direct deposit';

  constructor(private store: Store) {
    // this.store = store;
  }

  onPlaidSubmitting = (value: boolean): void => {
    this.store.option.setPlaidSubmitting(value);
  };

  getPlaidSubmitting = (): boolean => {
    return this.store.option.plaidSubmitting;
  };

  getEmail = (): string => {
    return this.store.option.email;
  };

  setInstitutionFound = (value: boolean): void => {
    this.store.option.setInstitutionFound(value);
  };

  setInstitutionSearched = (value: boolean): void => {
    this.store.option.setInstitutionSearched(value);
  };

  getInstitutionSearched = (): boolean => {
    return this.store.option.institutionSearched;
  };

  getInstitutionLogo = async (institutionId: string): Promise<void> => {
    const resp = await getInstitutionLogo(institutionId);
    if (isErrorResponse(resp)) {
      throw resp;
    }
    console.log('resp for onmstitition >>>> ', JSON.stringify(resp));
    this.store.deposit.setInstitutionLogo(resp.data.data.logo);
  };
}

export default PlaidButtonViewModel;
