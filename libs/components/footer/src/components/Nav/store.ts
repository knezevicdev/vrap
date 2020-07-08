/* eslint-disable @typescript-eslint/camelcase */
import ClientSideCookies from 'js-cookie';
import { action, observable } from 'mobx';
import { parse, stringify } from 'qs';

class NavStore {
  private static phoneNumberCookieName = 'sitePhoneNumber';

  @observable phoneNumber?: string;

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
    this.queryString = stringify(picked, { addQueryPrefix: true });
  };

  @action
  private initPhoneNumberClientSide = (): void => {
    const phoneNumber = ClientSideCookies.get(NavStore.phoneNumberCookieName);
    if (phoneNumber) {
      this.phoneNumber = phoneNumber;
    }
  };

  @action
  initClientSide = (): void => {
    this.initQueryStringClientSide();
    this.initPhoneNumberClientSide();
  };
}

export default NavStore;
