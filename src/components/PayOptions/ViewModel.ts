import { ChangeEventHandler } from 'react';

import { OptionsStore } from '../../modules/options/store';

class PayOptionViewModel {
  private readonly oStore: OptionsStore;
  readonly optionMeta: string[] = ['Direct Deposit', 'Check by Mail'];
  constructor(oStore: OptionsStore) {
    this.oStore = oStore;
  }

  onPayOptionClick: ChangeEventHandler<HTMLInputElement> = (event): void => {
    this.oStore.setPayOptionSelected(event.target.value);
  };
}

export default PayOptionViewModel;
