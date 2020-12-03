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

  readonly utm_params = `?utm_source=vroom_subdomain&utm_medium=referral&utm_campaign=vroom`;

  readonly shopNow: Link = {
    label: 'Shop now',
    href: `/cars`,
    handleAnalytics: this.analyticsHandler.trackShopNow,
  };
  readonly logoLink: Link = {
    href: '/',
    handleAnalytics: this.analyticsHandler.trackLogo,
  };

  readonly financeCalculators: Link = {
    label: 'Finance Calculators',
    href: `https://santanderconsumerusa.com/learning-center/finance-calculators${this.utm_params}`,
    target: '_blank',
    handleAnalytics: this.analyticsHandler.trackFinanceCalculator,
  };
  readonly learningCenterLabel: string = 'Learning Center';

  readonly learningCenterLinks: Link[] = [
    {
      label: 'Overview',
      href: `https://santanderconsumerusa.com/learning-center${this.utm_params}`,
      target: '_blank',
      handleAnalytics: this.analyticsHandler.trackLearningOverview,
    },
    {
      label: 'Blog',
      href: `https://santanderconsumerusa.com/blog${this.utm_params}`,
      target: '_blank',
      handleAnalytics: this.analyticsHandler.trackLearningBlog,
    },
    {
      label: 'Servicemembers Civil Relief Act',
      href: `https://santanderconsumerusa.com/legal/servicemembers-civil-relief-act${this.utm_params}`,
      target: '_blank',
      handleAnalytics: this.analyticsHandler.trackLearningServicemembers,
    },
  ];

  readonly contactUs: Link = {
    label: 'Contact Us',
    href: `/contact`,
    handleAnalytics: this.analyticsHandler.trackContact,
  };

  readonly backToCorporate: Link = {
    label: 'Back to Corporate Site',
    href: `https://santanderconsumerusa.com${this.utm_params}`,
    handleAnalytics: this.analyticsHandler.trackCorporateSite,
  };

  readonly poweredBy = 'Powered by';

  isDropdownOpen = (): boolean => {
    return this.store.isOpen;
  };

  isDrawerOpen = (): boolean => {
    return this.store.isDrawerOpen;
  };

  onDrawerClick = (): void => {
    this.store.isDrawerOpen ? this.closeDrawer() : this.openDrawer();
  };

  onDropdownClick = (): void => {
    this.store.isOpen ? this.closeDropdown() : this.openDropdown();
  };

  onClickAway = (): void => {
    this.store.isOpen && this.closeDropdown();
  };

  private closeDrawer = (): void => {
    this.store.setIsDrawerOpen(false);
  };

  private openDrawer = (): void => {
    this.store.setIsDrawerOpen(true);
  };

  private closeDropdown = (): void => {
    this.store.setIsOpen(false);
  };

  private openDropdown = (): void => {
    this.store.setIsOpen(true);
  };
}

export default ViewModel;
