import AnalyticsHandler from './integrations/AnalyticsHandler';
import Store from './store';

interface Link {
  linkToVroom: boolean;
  href?: string;
  label?: string;
  target?: string;
  rel?: string;
  handleAnalytics: () => void;
}

class ViewModel {
  private readonly store: Store;
  private analyticsHandler = new AnalyticsHandler();

  constructor(store: Store, vroomUrl?: string) {
    this.store = store;
    if (vroomUrl) {
      this.navLinks.forEach((navLink) => {
        if (navLink.linkToVroom)
          navLink.href = `${vroomUrl}${navLink.href}${this.TDAQueryString}`;
      });
    }
  }
  readonly TDAQueryString: string =
    '?vit_source=texasdirectauto&vit_medium=wl&vit_dest=vroom&vit_brand=TDA';

  readonly logoLink: Link = {
    linkToVroom: false,
    href: '/',
    handleAnalytics: this.analyticsHandler.trackLogoClicked,
  };

  readonly navLinks: Link[] = [
    {
      linkToVroom: false,
      href: '/cars',
      label: 'BUY',
      handleAnalytics: this.analyticsHandler.trackBuyClicked,
    },
    {
      linkToVroom: true,
      href: '/sell',
      label: 'SELL/TRADE',
      handleAnalytics: this.analyticsHandler.trackSellTradeClicked,
    },
    {
      linkToVroom: true,
      href: '/finance',
      label: 'FINANCE',
      handleAnalytics: this.analyticsHandler.trackFinanceClicked,
    },
    {
      linkToVroom: false,
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
