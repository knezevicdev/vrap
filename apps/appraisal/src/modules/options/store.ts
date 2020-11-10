import { action, observable, runInAction } from 'mobx';
import { createContext, useContext } from 'react';

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
};
export interface OptionStoreState {
  mailingAddress: {
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    zipcode: string;
  };
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
    };
    return optionState;
  } catch (err) {
    console.log('err', err);
    const errorState = defaultOptionsState;
    return errorState;
  }
}

export class OptionsStore {
  @observable payOptionSelected = 'Direct Deposit';
  @observable payOptionArr = ['Direct Deposit', 'Check by Mail'];
  @observable showDD = true;
  @observable remainingLoan = 0;
  @observable mailingAddress = {};

  constructor(priceId?: string) {
    if (priceId) this.init(priceId);
  }

  @action
  async init(priceId: string): Promise<void> {
    const initialState = await getInitialOptionsStoreState(priceId);
    runInAction(() => {
      this.mailingAddress = initialState.mailingAddress;
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
