import ClientSideCookies from 'js-cookie';
import { action, observable } from 'mobx';

class NavStore {
  private static phoneNumberCookieName = 'sitePhoneNumber';

  @observable phoneNumber?: string;

  @action
  private initPhoneNumberClientSide = (): void => {
    const phoneNumber = ClientSideCookies.get(NavStore.phoneNumberCookieName);
    if (phoneNumber) {
      this.phoneNumber = phoneNumber;
    }
  };

  @action
  initClientSide = (): void => {
    this.initPhoneNumberClientSide();
  };
}

export default NavStore;
