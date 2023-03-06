import { makeObservable, observable } from 'mobx';

import { OptionsStore } from '../../modules/options/store';
import Store from '../../store';

class PayOptionViewModel {
  readonly optionMeta: string[] = ['Direct Deposit', 'Check by Mail'];
  oStore: OptionsStore;
  appStore: Store;
  constructor(oStore: OptionsStore, appStore: Store) {
    this.oStore = oStore;
    this.appStore = appStore;
    makeObservable(this, {
      oStore: observable,
    });
  }

  handleAddressChange = (value: string): void => {
    this.oStore.setPayOptionSelected(value);
  };

  get isAbsmartlyLoading(): boolean {
    return this.appStore.absmart.isABSmartlyLoading;
  }

  get isSuycPaymentCheckFeeTest(): boolean {
    return this.appStore.absmart.isInExperiment('suyc-payment-check-fee');
  }
}

export default PayOptionViewModel;
