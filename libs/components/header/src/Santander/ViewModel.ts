import Store from './store';

interface Link {
  href?: string;
  label: string;
  target?: string;
  rel?: string;
}

class ViewModel {
  private readonly store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  readonly shopNow: Link = { label: 'Shop now', href: `/cars` };

  readonly financeCalculators: Link = {
    label: 'Finance Calculators',
    href:
      'https://santanderconsumerusa.com/learning-center/finance-calculators',
    target: '_blank',
  };
  readonly learningCenterLabel: string = 'Learning Center';

  readonly learningCenterLinks: Link[] = [
    {
      label: 'Overview',
      href: 'https://santanderconsumerusa.com/learning-center',
      target: '_blank',
    },
    {
      label: 'Blog',
      href: 'https://santanderconsumerusa.com/blog',
      target: '_blank',
    },
    {
      label: 'Financial Education',
      href:
        'https://santanderconsumerusa.com/learning-center/financial-education',
      target: '_blank',
    },
    {
      label: 'Servicemembers Civil Relief Act',
      href:
        'https://santanderconsumerusa.com/legal/servicemembers-civil-relief-act',
      target: '_blank',
    },
  ];

  readonly contactUs: Link = { label: 'Contact Us', href: `/contact` };

  readonly backToCorporate: Link = {
    label: 'Back to Corporate Site',
    href: 'https://santanderconsumerusa.com/',
  };

  isDropdownOpen = (): boolean => {
    return this.store.isOpen;
  };

  onClick = (): void => {
    this.store.isOpen ? this.closeDropdown() : this.openDropdown();
  };

  closeDropdown = (): void => {
    this.store.setIsOpen(false);
  };

  openDropdown = (): void => {
    this.store.setIsOpen(true);
  };
}

export default ViewModel;
