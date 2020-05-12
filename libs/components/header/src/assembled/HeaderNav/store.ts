import ClientSideCookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { action, observable } from 'mobx';

class HeaderNavStore {
  private static authTokenCookieName = 'authToken';
  private static phoneNumberCookieName = 'sitePhoneNumber';

  @observable phoneNumber?: string;
  @observable loggedIn = false;
  @observable name?: string;

  @action
  private initAuthTokenClientSide = (): void => {
    try {
      // https://github.com/js-cookie/js-cookie/blob/master/SERVER_SIDE.md#express
      const authTokenWithExpressPrefix = ClientSideCookies.get(
        HeaderNavStore.authTokenCookieName
      );
      if (!authTokenWithExpressPrefix) {
        this.loggedIn = false;
        return;
      }
      const authToken = JSON.parse(authTokenWithExpressPrefix.slice(2));
      const { accessToken, idToken } = authToken;
      const { name } = jwtDecode(idToken);
      this.name = name;
      const { exp: expirationTimestamp } = jwtDecode(accessToken);
      const loggedIn = expirationTimestamp > new Date().getTime() / 1000;
      this.loggedIn = loggedIn;
    } catch {
      this.loggedIn = false;
    }
  };

  @action
  private initPhoneNumberClientSide = (): void => {
    const phoneNumber = ClientSideCookies.get(
      HeaderNavStore.phoneNumberCookieName
    );
    if (phoneNumber) {
      this.phoneNumber = phoneNumber;
    }
  };

  @action
  initClientSide = (): void => {
    this.initAuthTokenClientSide();
    this.initPhoneNumberClientSide();
  };

  @action
  signOut = (): void => {
    ClientSideCookies.remove('authToken');
    this.loggedIn = false;
  };
}

export default HeaderNavStore;
