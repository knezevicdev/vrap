import { action, observable, runInAction } from 'mobx';

import { Networker } from 'src/networking/Networker';

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
    const response = await networker.getPlaidToken(priceId);
    const plaidToken = response.data.data.getLinkToken;
    return plaidToken;
  } catch (err) {
    console.log(JSON.stringify(err));
    const errorState = defaultDDState;
    return errorState;
  }
}

export class DirectDepositStore {
  @observable linkToken = defaultDDState.LinkToken;
  @observable expiration = defaultDDState.Expiration;
  @observable requestId = defaultDDState.RequestId;
  @observable priceId = '';
  @observable showPlaidLink = true;

  constructor(priceId: string) {
    this.priceId = priceId;
    this.initClientSide();
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
