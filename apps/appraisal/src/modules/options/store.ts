import { action, observable, runInAction } from 'mobx';
import { createContext, useContext } from 'react';

import { PaymentOverviewFormValues } from 'src/interfaces.d';
import { MailingAddress } from 'src/interfaces.d';
import { Verification } from 'src/networking/models/Price';
import { Networker } from 'src/networking/Networker';

const defaultOptionsState: OptionStoreState = {
  mailingAddress: {
    // eslint-disable-next-line @typescript-eslint/camelcase
    address_1: '',
    // eslint-disable-next-line @typescript-eslint/camelcase
    address_2: '',
    city: '',
    state: '',
    zipcode: '',
  },
  email: ''
};
export interface OptionStoreState {
  mailingAddress: MailingAddress;
  email: string;
}

export async function getInitialOptionsStoreState(
  priceId: string
): Promise<OptionStoreState> {
  const networker = new Networker();
  try {
    const verifyResponse = await networker.getVerificationDetails(priceId);
    const verificationData: Verification = verifyResponse.data.data;

    const optionState = {
      mailingAddress: verificationData.owner_mailing_address,
      email: verificationData.email,
    };
    return optionState;
  } catch (err) {
    console.log(JSON.stringify(err));
    const errorState = defaultOptionsState;
    return errorState;
  }
}

export async function submitPaymentOptions(
  values: PaymentOverviewFormValues,
  priceId: string,
  address: MailingAddress
): Promise<void> {
  const networker = new Networker();
  try {
    await networker.submitPaymentOptions(values, priceId, address);
  } catch (err) {
    console.log(JSON.stringify(err));
    return err;
  }
}

export class OptionsStore {
  @observable payOptionSelected = 'Direct Deposit';
  @observable payOptionArr = ['Direct Deposit', 'Check by Mail'];
  @observable showDD = true;
  @observable remainingLoan = 0;
  @observable mailingAddress = defaultOptionsState.mailingAddress;
  @observable priceId = '';
  @observable email = '';

  constructor(priceId?: string) {
    if (priceId) this.init(priceId);
  }

  @action
  async init(priceId: string): Promise<void> {
    const initialState = await getInitialOptionsStoreState(priceId);
    runInAction(() => {
      this.mailingAddress = initialState.mailingAddress;
      this.email = initialState.email;
      this.priceId = priceId;
    });
  }

  @action
  setPayOptionSelected = (value: string): void => {
    this.payOptionSelected = value;
    this.showDD = value === this.payOptionArr[0];
  };
}

export const OptionsStoreContext = createContext<OptionsStore>(
  new OptionsStore()
);

export const useOptionsStore = (): OptionsStore => {
  const store = useContext(OptionsStoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
