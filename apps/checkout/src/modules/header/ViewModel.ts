import { DealStore } from 'src/core/store/DealStore';

import { HeaderAnalyticsHandler } from 'src/integrations/header/HeaderAnalyticsHandler';

class HeaderViewModel {
  readonly logoHref = '/';
  readonly telephone = {
    text: 'Questions?',
    href: 'tel: (855) 524-1300',
    number: `(855) 524-1300`,
  };
  private store: DealStore;
  private analyticsHandler: HeaderAnalyticsHandler;

  constructor(store: DealStore, analyticsHandler: HeaderAnalyticsHandler) {
    this.store = store;
    this.analyticsHandler = analyticsHandler;
  }

  handleLogoClick = (): void => {
    this.analyticsHandler.trackHeaderLogoClicked();
  };

  handleClick = (): void => {
    this.store.toggleDropdown();
  };
}

export default HeaderViewModel;
