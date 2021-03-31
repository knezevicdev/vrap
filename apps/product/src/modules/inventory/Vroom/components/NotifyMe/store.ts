import ClientSideCookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { action, makeObservable, observable, runInAction } from 'mobx';

import { Status } from 'src/networking/types';

export class NotifyMeStore {
  @observable modalOpen = false;
  @observable userTokenStatus: Status = Status.INITIAL;
  @observable accessToken?: string;
  @observable isChecked = false;
  @observable isError = false;
  @observable isSuccessful = false;
  @observable notifyMeLoading = true;
  @observable dialogButtonLoading = true;

  constructor() {
    makeObservable(this);
  }

  @action
  private async initUserAccount(): Promise<void> {
    try {
      // https://github.com/js-cookie/js-cookie/blob/master/SERVER_SIDE.md#express
      const authTokenWithExpressPrefix = ClientSideCookies.get('authToken');
      if (!authTokenWithExpressPrefix) {
        return undefined;
      }
      const authToken = JSON.parse(authTokenWithExpressPrefix.slice(2));
      const { exp: expirationTimestamp } = jwtDecode(authToken.accessToken);
      const loggedIn = expirationTimestamp > new Date().getTime() / 1000;
      if (!loggedIn) {
        return undefined;
      }
      try {
        this.accessToken = authToken.accessToken;
      } catch {
        this.accessToken = undefined;
      }
    } catch {
      runInAction(() => {
        this.userTokenStatus = Status.ERROR;
      });
    }
  }

  @action
  initClientSide(): void {
    this.initUserAccount();
  }

  @action
  toggleModal(): void {
    this.modalOpen = !this.modalOpen;
  }

  @action
  toggleCheckbox(): void {
    this.isChecked = !this.isChecked;
  }

  @action
  setError(value: boolean): void {
    this.isError = value;
  }

  @action
  setSuccess(value: boolean): void {
    this.isSuccessful = value;
  }

  @action
  setNotifyMeLoading(value: boolean): void {
    this.notifyMeLoading = value;
  }

  @action
  setDialogButtonLoading(value: boolean): void {
    this.dialogButtonLoading = value;
  }
}
