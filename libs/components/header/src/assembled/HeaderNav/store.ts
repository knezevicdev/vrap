import ClientSideCookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { action, observable } from 'mobx';

class HeaderNavStore {
  @observable loggedIn = false;

  @action
  checkLoggedInClientSide = (): void => {
    try {
      // https://github.com/js-cookie/js-cookie/blob/master/SERVER_SIDE.md#express
      const authTokenWithExpressPrefix = ClientSideCookies.get('authToken');
      if (!authTokenWithExpressPrefix) {
        this.loggedIn = false;
        return;
      }
      const authToken = JSON.parse(authTokenWithExpressPrefix.slice(2));
      const { accessToken } = authToken;
      const { exp: expirationTimestamp } = jwtDecode(accessToken);
      const loggedIn = expirationTimestamp > new Date().getTime() / 1000;
      this.loggedIn = loggedIn;
    } catch {
      this.loggedIn = false;
    }
  };

  @action
  signOut = (): void => {
    ClientSideCookies.remove('authToken');
    this.loggedIn = false;
  };
}

export default HeaderNavStore;
