import { isErrorResponse } from '@vroom-web/networking';
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
import {
  getVerificationDetails,
  submitPaymentOptionSelected,
} from 'src/networking/request';

const defaultOptionsState: OptionStoreState = {
  mailingAddress: {
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    zipcode: '',
  },
  email: '',
  currentPayments: false,
  poq: {
    account_number: '',
    final_payment: 0,
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
  try {
    const verifyResponse = await getVerificationDetails(priceId);

    if (isErrorResponse(verifyResponse)) throw verifyResponse;

    const verificationData: Verification = verifyResponse.data.data;
    const optionState = {
      mailingAddress: {
        address_1: verificationData.owner_mailing_address.address_1 || '',
        address_2: verificationData.owner_mailing_address.address_2 || '',
        city: verificationData.owner_mailing_address.city || '',
        state: verificationData.owner_mailing_address.state || '',
        zipcode: verificationData.owner_mailing_address.zipcode || '',
      },
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

export async function submitPaymentOption(
  values: PaymentOverviewFormValues,
  priceId: string,
  address: MailingAddress
): Promise<void> {
  try {
    await submitPaymentOptionSelected(values, priceId, address);
  } catch (err) {
    console.log(JSON.stringify(err));
  }
}

export class OptionsStore implements Store {
  showDD = 'Direct Deposit';
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
  abSmartlyTest?: boolean = undefined;

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
      abSmartlyTest: observable,
      setPayOptionSelected: action,
      setInstitutionFound: action,
      setInstitutionSearched: action,
      setPlaidSubmitting: action,
    });
  }

  async init(priceId: string): Promise<void> {
    if (priceId !== undefined) {
      this.priceId = priceId;
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
    this.showDD = value;
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

  setABSmartTest = (value: boolean): void => {
    this.abSmartlyTest = value;
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
