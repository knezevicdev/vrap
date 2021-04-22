import { action, makeObservable, observable, runInAction } from 'mobx';
import { createContext, useContext } from 'react';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { AsyncStatus, PlaidData, Store, StoreStatus } from 'src/interfaces.d';
import { Networker } from 'src/networking/Networker';

const defaultDDState: DDStoreState = {
  LinkToken: '',
  Expiration: '',
  RequestId: '',
};

export interface DDStoreState {
  LinkToken: string;
  Expiration: string;
  RequestId: string;
}

export async function getInitialDDStoreState(
  priceId: string
): Promise<DDStoreState> {
  const networker = new Networker();
  try {
    const tokenResponse = await networker.getPlaidToken(priceId);
    const plaidToken = tokenResponse.data.data.getLinkToken;
    localStorage.setItem('linkToken', plaidToken.LinkToken);
    localStorage.setItem('priceId', priceId);
    return plaidToken;
  } catch (err) {
    const errorState = defaultDDState;
    return errorState;
  }
}

export async function plaidSuccess(
  mutationInput: PlaidData,
  onPlaidSubmitting: (value: boolean) => void
): Promise<void> {
  const networker = new Networker();
  const analyticsHandler = new AnalyticsHandler();

  try {
    analyticsHandler.trackPaymentOptionsSubmitted('Plaid ACH');
    await networker.postPlaidPayment(mutationInput);
    const url = `/sell/verification-congrats`;
    window.location.href = url;
  } catch (err) {
    onPlaidSubmitting(false);
    console.log(JSON.stringify(err));
    return err;
  }
}

export class DirectDepositStore implements Store {
  linkToken = defaultDDState.LinkToken;
  expiration = defaultDDState.Expiration;
  requestId = defaultDDState.RequestId;
  priceId = '';
  showPlaidLink = true;
  storeStatus = StoreStatus.Initial;
  asyncStatus = AsyncStatus.Idle;

  constructor(priceId?: string) {
    if (priceId) {
      this.priceId = priceId;
    }

    this.initClientSide(priceId);

    makeObservable(this, {
      linkToken: observable,
      expiration: observable,
      requestId: observable,
      priceId: observable,
      showPlaidLink: observable,
      storeStatus: observable,
      asyncStatus: observable,
      initClientSide: action,
      togglePlaidLink: action,
    });
  }

  async initClientSide(priceId?: string): Promise<void> {
    const localToken = localStorage.getItem('linkToken');
    const localPriceId = localStorage.getItem('priceId');

    if (localPriceId && priceId === undefined) {
      this.priceId = localPriceId;
      priceId = localPriceId;
    }

    if (localToken) {
      this.linkToken = localToken;
    } else {
      if (priceId === undefined) {
        return;
      }

      const initialState = await getInitialDDStoreState(priceId);
      runInAction(() => {
        this.linkToken = initialState.LinkToken;
        this.expiration = initialState.Expiration;
        this.requestId = initialState.RequestId;
      });
    }
  }

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
