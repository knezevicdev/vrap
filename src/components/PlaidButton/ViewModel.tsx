import { isErrorResponse } from '@vroom-web/networking';

import { OptionsStore } from '../../modules/options/store';

import { getInstitutionLogo } from 'src/networking/request';
import Store from 'src/store';

class PlaidButtonViewModel {
  constructor(private oStore: OptionsStore, private store: Store) {}

  onPlaidSubmitting = (value: boolean): void => {
    this.oStore.setPlaidSubmitting(value);
  };

  getPlaidSubmitting = (): boolean => {
    return this.oStore.plaidSubmitting;
  };

  getEmail = (): string => {
    return this.oStore.email;
  };

  setInstitutionFound = (value: boolean): void => {
    this.oStore.setInstitutionFound(value);
  };

  setInstitutionSearched = (value: boolean): void => {
    this.oStore.setInstitutionSearched(value);
  };

  getInstitutionSearched = (): boolean => {
    return this.oStore.institutionSearched;
  };

  getInstitutionLogo = async (institutionId: string): Promise<void> => {
    const resp = await getInstitutionLogo(institutionId);
    if (isErrorResponse(resp)) {
      throw resp;
    }
    this.store.deposit.setInstitutionLogo(resp.data.data.logo);
  };
}

export default PlaidButtonViewModel;
