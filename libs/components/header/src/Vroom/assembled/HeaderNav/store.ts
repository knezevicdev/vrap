/* eslint-disable @typescript-eslint/camelcase */
import { CatData, CatSDK } from '@vroom-web/cat-sdk';
import ClientSideCookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { action, computed, observable } from 'mobx';
import { parse, stringify } from 'qs';

class HeaderNavStore {
  private static authTokenCookieName = 'authToken';
  private readonly catSDK = new CatSDK();

  @observable catData: CatData | undefined;
  @computed get phoneNumber(): string | undefined {
    if (!this.catData) {
      return undefined;
    }
    return this.catData.sitePhoneNumber;
  }
  @observable loggedIn = false;
  @observable name?: string;

  // FIT-566
  // As a stopgap, the we persist certain query params across navigation.
  // This is so that vlassic attribution works until we build a better system.
  @observable queryString = '';

  @action
  private initQueryStringClientSide = (): void => {
    const query = parse(window.location.search, { ignoreQueryPrefix: true });
    const picked = (({
      gclid,
      subid,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      utm_keyword,
      utm_subsource,
      utm_site,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }): any => ({
      gclid,
      subid,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      utm_keyword,
      utm_subsource,
      utm_site,
    }))(query);
    console.log({ query, picked });

    this.queryString = stringify(picked, { addQueryPrefix: true });
    console.log(this.queryString);
  };

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
      const { exp: expirationTimestamp } = jwtDecode(authToken.accessToken);
      const loggedIn = expirationTimestamp > new Date().getTime() / 1000;
      this.loggedIn = loggedIn;

      // FIT-488
      // This is a stopgap until the authToken cookie realiably includes "idToken" data.
      // We will set the "name" field if "idToken" is defined, otherwise gracefully fail.
      try {
        const { name } = jwtDecode(authToken.idToken);
        this.name = name;
      } catch {
        this.name = undefined;
      }
    } catch {
      this.loggedIn = false;
    }
  };

  @action
  setCatData = (catData: CatData): void => {
    this.catData = catData;
  };

  catDataEventListener = (catDataEvent: CustomEvent<CatData>): void => {
    this.setCatData(catDataEvent.detail);
  };

  initClientSide = (): void => {
    this.initQueryStringClientSide();
    this.initAuthTokenClientSide();
    this.catSDK.observeCatData(this.catDataEventListener);
  };

  tearDownClientSide = (): void => {
    this.catSDK.unobserveCatData(this.catDataEventListener);
  };

  @action
  signOut = (): void => {
    ClientSideCookies.remove('authToken');
    // FIT-468.
    // The vroom-com application persists its redux state using session storage.
    // In order to make sure sign outs are registered by the vroom-com app,
    // we need to clear the persisted data here.
    // When we get to a point where we've fully ported off vroom-com,
    // this line can be reassesed and likely removed.
    sessionStorage.removeItem('persist:root');
    this.loggedIn = false;
  };
}

export default HeaderNavStore;
