import { ABSmartlyContextValue } from '@vroom-web/analytics-integration/dist/absmartly/types';
import { makeObservable, observable } from 'mobx';

import { OptionsStore } from '../../modules/options/store';

class PayOptionViewModel {
  readonly optionMeta: string[] = ['Direct Deposit', 'Check by Mail'];
  oStore: OptionsStore;
  constructor(oStore: OptionsStore, private absmartly: ABSmartlyContextValue) {
    this.oStore = oStore;
    makeObservable(this, {
      oStore: observable,
    });
  }

  handleAddressChange = (value: string): void => {
    this.oStore.setPayOptionSelected(value);
  };

  get isAbsmartlyLoading(): boolean {
    return this.absmartly.isLoading;
  }

  get isSuycPaymentCheckFeeTest(): boolean {
    return this.absmartly.isInExperiment('suyc-payment-check-fee');
  }
}

export default PayOptionViewModel;
