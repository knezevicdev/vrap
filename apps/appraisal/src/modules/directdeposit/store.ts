import { action, observable, runInAction } from 'mobx';
import { createContext, useContext } from 'react';

import { Networker } from 'src/networking/Networker';

import { PlaidData } from 'src/interfaces.d';

const defaultDDState: DDStoreState = {
  LinkToken: '',
  Expiration: '',
  RequestId: ''
};

export interface DDStoreState {
  LinkToken: string,
  Expiration: string,
  RequestId: string
}

export async function getInitialDDStoreState(
  priceId: string
): Promise<DDStoreState> {
  const networker = new Networker();
  try {
    const tokenResponse = await networker.getPlaidToken(priceId);
    const plaidToken = tokenResponse.data.data.getLinkToken;
    return plaidToken;
  } catch (err) {
    console.log(JSON.stringify(err));
    const errorState = defaultDDState;
    return errorState;
  }
}

export async function plaidSuccess(mutationInput: PlaidData, onPlaidSubmitting: any): Promise<void> {
  const networker = new Networker();
  try {
    await networker.postPlaidPayment(mutationInput);
    const url = `/sell/verification-congrats`;
    window.location.href = url;
  } catch (err) {
    onPlaidSubmitting(false);
    console.log(JSON.stringify(err));
    return err;
  }
}

export class DirectDepositStore {
  @observable linkToken = defaultDDState.LinkToken;
  @observable expiration = defaultDDState.Expiration;
  @observable requestId = defaultDDState.RequestId;
  @observable priceId = '';
  @observable showPlaidLink = true;

  constructor(priceId?: string) {
    if (priceId) {
      this.priceId = priceId;
      this.initClientSide();
    }
  }

  @action
  async initClientSide(): Promise<void> {
    const initialState = await getInitialDDStoreState(this.priceId);
    runInAction(() => {
      this.linkToken = initialState.LinkToken;
      this.expiration = initialState.Expiration;
      this.requestId = initialState.RequestId;
    });
  }

  @action
  togglePlaidLink = (): void => {
    this.showPlaidLink = !this.showPlaidLink;
  };
}

export const DirectDepositStoreContext = createContext<DirectDepositStore>(
  new DirectDepositStore()
);

export const useDirectDepositStore = (): DirectDepositStore => {
  const store = useContext(DirectDepositStoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
