import AnalyticsHandler from './integrations/AnalyticsHandler';
import Store from './store';

interface Link {
  href?: string;
  label?: string;
  target?: string;
  rel?: string;
  handleAnalytics: () => void;
}

class ViewModel {
  private readonly store: Store;
  private analyticsHandler = new AnalyticsHandler();

  constructor(store: Store) {
    this.store = store;
  }

  readonly logoLink: Link = {
    href: '/',
    handleAnalytics: this.analyticsHandler.trackLogoClicked,
  };

  readonly navLinks: Link[] = [
    {
      href: '/cars',
      label: 'BUY',
      handleAnalytics: this.analyticsHandler.trackBuyClicked,
    },
    {
      href: 'https://www.vroom.com/sell',
      label: 'SELL/TRADE',
      handleAnalytics: this.analyticsHandler.trackSellTradeClicked,
    },
    {
      href: 'https://www.vroom.com/finance',
      label: 'FINANCE',
      handleAnalytics: this.analyticsHandler.trackFinanceClicked,
    },
    // {
    //   href: '/locations',
    //   label: 'LOCATIONS',
    //   handleAnalytics: this.analyticsHandler.trackLocationsClicked,
    // },
    {
      href: '/contact',
      label: 'CONTACT US',
      handleAnalytics: this.analyticsHandler.trackContactUsClicked,
    },
  ];

  isDrawerOpen = (): boolean => {
    return this.store.isDrawerOpen;
  };

  onDrawerClick = (): void => {
    this.store.isDrawerOpen ? this.closeDrawer() : this.openDrawer();
  };

  private closeDrawer = (): void => {
    this.store.setIsDrawerOpen(false);
  };

  private openDrawer = (): void => {
    this.store.setIsDrawerOpen(true);
  };
}

export default ViewModel;
