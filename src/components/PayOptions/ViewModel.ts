import { makeObservable, observable } from 'mobx';
import { ChangeEventHandler } from 'react';

import { OptionsStore } from '../../modules/options/store';

class PayOptionViewModel {
  readonly optionMeta: string[] = ['Direct Deposit', 'Check by Mail'];
  oStore: OptionsStore;
  constructor(oStore: OptionsStore) {
    this.oStore = oStore;
    makeObservable(this, {
      oStore: observable,
    });
  }

  handleAddressChange: ChangeEventHandler<HTMLInputElement> = (event): void => {
    this.oStore.setPayOptionSelected(event.target.value);
  };
}

export default PayOptionViewModel;
