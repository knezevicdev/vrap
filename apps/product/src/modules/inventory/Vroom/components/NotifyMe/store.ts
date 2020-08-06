import ClientSideCookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { action, observable, runInAction } from 'mobx';

import { Status } from 'src/networking/types';

export class NotifyMeStore {
  @observable modalOpen = false;
  @observable userTokenStatus: Status = Status.INITIAL;
  @observable email?: string;

  @action
  private initUserAccount = async (): Promise<void> => {
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
        const { email } = jwtDecode(authToken.idToken);
        this.email = email;
      } catch {
        this.email = undefined;
      }
    } catch {
      runInAction(() => {
        this.userTokenStatus = Status.ERROR;
      });
    }
  };

  @action
  initClientSide = (): void => {
    this.initUserAccount();
  };

  @action
  toggleModal = (): void => {
    this.modalOpen = !this.modalOpen;
  };
}
