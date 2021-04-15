import { CatStore, PhoneNumberLink } from 'src/core/store';
import { DealStore } from 'src/core/store/DealStore';
import { HeaderAnalyticsHandler } from 'src/integrations/header/HeaderAnalyticsHandler';

class HeaderViewModel {
  readonly logoHref = '/';
  readonly label = 'Questions?';
  private dealStore: DealStore;
  private store: CatStore;
  private analyticsHandler: HeaderAnalyticsHandler;

  constructor(
    dealStore: DealStore,
    analyticsHandler: HeaderAnalyticsHandler,
    store: CatStore
  ) {
    this.dealStore = dealStore;
    this.analyticsHandler = analyticsHandler;
    this.store = store;
  }

  handleMount(): void {
    this.store.initClientSide();
  }

  handleUnmount(): void {
    this.store.tearDownClientSide();
  }

  handleLogoClick = (): void => {
    this.analyticsHandler.trackHeaderLogoClicked();
  };

  handleClick = (): void => {
    this.dealStore.toggleDropdown();
  };

  get phoneNumber(): PhoneNumberLink {
    return this.store.phoneNumber;
  }
}

export default HeaderViewModel;
