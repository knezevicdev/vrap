import ClientSideCookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { action, makeObservable, observable, runInAction } from 'mobx';

import { Status } from 'src/networking/types';

export class FavoritesStore {
  @observable isFavorited = false;
  @observable userTokenStatus: Status = Status.INITIAL;
  @observable accessToken?: string = undefined;
  @observable loading = true;
  @observable isDialogOpen = false;
  @observable isSnackbarOpen = false;
  @observable isError = false;

  constructor() {
    makeObservable(this);
  }

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
        this.accessToken = authToken.accessToken;
        this.userTokenStatus = Status.SUCCESS;
      } catch {
        this.accessToken = undefined;
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
  setFavorited = (): void => {
    this.isFavorited = !this.isFavorited;
  };

  @action
  setLoading = (flag: boolean): void => {
    this.loading = flag;
  };

  @action
  setDialog = (): void => {
    this.isDialogOpen = !this.isDialogOpen;
  };

  @action
  setSnackbar = (): void => {
    this.isSnackbarOpen = !this.isSnackbarOpen;
  };

  @action
  setError = (): void => {
    this.isError = !this.isError;
  };
}
