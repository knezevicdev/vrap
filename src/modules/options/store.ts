import { action, makeObservable, observable, runInAction } from 'mobx';
import { createContext, useContext } from 'react';

import {
  AsyncStatus,
  PaymentOverviewFormValues,
  Store,
  StoreStatus,
} from 'src/interfaces.d';
import { MailingAddress } from 'src/interfaces.d';
import { Poq, Verification } from 'src/networking/models/Price';
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
  email: '',
  currentPayments: false,
  poq: {
    // eslint-disable-next-line @typescript-eslint/camelcase
    account_number: '',
    // eslint-disable-next-line @typescript-eslint/camelcase
    final_payment: 0,
    // eslint-disable-next-line @typescript-eslint/camelcase
    final_payoff: 0,
  },
  institutionFound: true,
  institutionSearched: false,
};

export interface OptionStoreState {
  mailingAddress: MailingAddress;
  email: string;
  currentPayments: boolean;
  poq: Poq;
  institutionFound: boolean;
  institutionSearched: boolean;
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
      currentPayments: verificationData.current_payments,
      poq: verificationData.poq,
      institutionFound: true,
      institutionSearched: false,
    };

    return optionState;
  } catch (err) {
    console.log(JSON.stringify(err));
    return defaultOptionsState;
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

export class OptionsStore implements Store {
  showDD = true;
  mailingAddress = defaultOptionsState.mailingAddress;
  priceId = '';
  email = '';
  plaidSubmitting = false;
  currentPayments = defaultOptionsState.currentPayments;
  poq = defaultOptionsState.poq;
  storeStatus = StoreStatus.Initial;
  asyncStatus = AsyncStatus.Idle;
  institutionFound = true;
  institutionSearched = false;

  constructor() {
    makeObservable(this, {
      showDD: observable,
      mailingAddress: observable,
      priceId: observable,
      email: observable,
      plaidSubmitting: observable,
      currentPayments: observable,
      poq: observable,
      storeStatus: observable,
      asyncStatus: observable,
      init: action,
      institutionFound: observable,
      institutionSearched: observable,
      setPayOptionSelected: action,
      setPlaidSubmitting: action,
      setInstitutionFound: action,
      setInstitutionSearched: action,
    });
  }

  async init(priceId: string): Promise<void> {
    const localPriceId = localStorage.getItem('priceId');

    priceId = localPriceId || priceId;

    if (priceId !== undefined) {
      runInAction(() => {
        this.priceId = priceId;
      });
    } else {
      return;
    }

    const initialState = await getInitialOptionsStoreState(priceId);

    runInAction(() => {
      this.storeStatus = StoreStatus.Success;
      this.mailingAddress = initialState.mailingAddress;
      this.email = initialState.email;
      this.currentPayments = initialState.currentPayments;
      this.poq = initialState.poq;
    });
  }

  setPayOptionSelected = (value: string): void => {
    this.showDD = value === 'Direct Deposit';
  };

  setPlaidSubmitting = (value: boolean): void => {
    this.plaidSubmitting = value;
  };

  setInstitutionFound = (value: boolean): void => {
    this.institutionFound = value;
  };

  setInstitutionSearched = (value: boolean): void => {
    this.institutionSearched = value;
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
