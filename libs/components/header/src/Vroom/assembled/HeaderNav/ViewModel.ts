import { parsePhoneNumberFromString } from 'libphonenumber-js';

import { DesktopLinks, MobileLinks } from '../../components/Nav';
import AnalyticsHandler from '../../integrations/AnalyticsHandler';
import { ReactComponent as AccountSvg } from '../../svg/account.svg';
import FavoritesHeartIconComponent from './FavoritesHeartIconComponent';
import HeaderNavStore from './store';

interface PhoneNumberLinkData {
  href: string;
  label: string;
}

class HeaderNavViewModel {
  private store: HeaderNavStore;
  private analyticsHandler: AnalyticsHandler;

  constructor(store: HeaderNavStore) {
    this.store = store;
    this.analyticsHandler = new AnalyticsHandler();
  }

  handleMount(): void {
    this.store.initClientSide();
  }

  private handleSignOutClick = (): void => {
    this.analyticsHandler.trackSignOutClicked();
    this.store.signOut();
  };

  private getPhoneNumberLinkData = (
    phoneNumber?: string
  ): PhoneNumberLinkData => {
    const defaultPhoneNumberLinkData: PhoneNumberLinkData = {
      href: 'tel:+18555241300',
      label: '(855) 524-1300',
    };
    if (!phoneNumber) {
      return defaultPhoneNumberLinkData;
    }
    const parsedPhoneNumber = parsePhoneNumberFromString(
      decodeURIComponent(phoneNumber),
      'US'
    );
    if (!parsedPhoneNumber) {
      return defaultPhoneNumberLinkData;
    }
    if (!parsedPhoneNumber.isValid()) {
      return defaultPhoneNumberLinkData;
    }
    const phoneNumberLinkData: PhoneNumberLinkData = {
      href: parsedPhoneNumber.getURI(),
      label: parsedPhoneNumber.formatNational(),
    };
    return phoneNumberLinkData;
  };

  private getAccountLabel(): string {
    const name = this.store.name;
    if (!name) {
      return 'ACCOUNT';
    }
    const tokens = name.split(' ');
    const firstLetters = tokens.map((token) => token[0]);
    const initials = firstLetters.join('');
    return initials;
  }

  desktopLinks(): DesktopLinks {
    const phoneNumberLinkData = this.getPhoneNumberLinkData(
      this.store.phoneNumber
    );
    // FIT-566
    // Persist query string across navigation so that vlassic attribution works.
    // This is a stopgap until a better attribution system is in place.
    const queryString = this.store.queryString;
    if (!this.store.loggedIn) {
      return [
        {
          type: 'link',
          href: `/cars${queryString}`,
          label: 'BUY',
          onClick: (): void => this.analyticsHandler.trackBuyClicked(),
        },
        {
          type: 'link',
          href: `/sell${queryString}`,
          label: 'SELL/TRADE',
          onClick: (): void => this.analyticsHandler.trackSellTradeClicked(),
        },
        {
          type: 'link',
          href: `/finance${queryString}`,
          label: 'FINANCE',
          onClick: (): void => this.analyticsHandler.trackFinanceClicked(),
        },
        {
          type: 'dropdown',
          label: 'ABOUT',
          links: [
            {
              href: `/about${queryString}`,
              label: 'About Us',
              onClick: (): void => this.analyticsHandler.trackAboutUsClicked(),
            },
            {
              href: `/protection${queryString}`,
              label: 'Vroom Protection',
              onClick: (): void =>
                this.analyticsHandler.trackVroomProtectionClicked(),
            },
            {
              href: `/how-it-works${queryString}`,
              label: 'How It Works',
              onClick: (): void =>
                this.analyticsHandler.trackHowItWorksClicked(),
            },
            {
              href: `/reviews${queryString}`,
              label: 'Customer Reviews',
              onClick: (): void =>
                this.analyticsHandler.trackCustomerReviewsClicked(),
            },
            {
              href: 'https://ir.vroom.com/',
              label: 'Investor Relations',
              onClick: (): void =>
                this.analyticsHandler.trackInvestorRelationsClicked(),
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'CONTACT',
          links: [
            {
              href: 'https://vroom.zendesk.com/hc/en-us',
              label: 'FAQ',
              onClick: (): void => this.analyticsHandler.trackFAQClicked(),
            },
            {
              href: phoneNumberLinkData.href,
              label: phoneNumberLinkData.label,
              onClick: (): void => this.analyticsHandler.trackPhoneClicked(),
            },
            {
              href: `/contact${queryString}`,
              label: 'Contact Us',
              onClick: (): void =>
                this.analyticsHandler.trackContactUsClicked(),
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'LOG IN',
          links: [
            {
              href: `/account/login${queryString}`,
              label: 'Log In',
              onClick: (): void => this.analyticsHandler.trackLoginClicked(),
            },
            {
              href: `/account/create${queryString}`,
              label: 'Register',
              onClick: (): void => this.analyticsHandler.trackRegisterClicked(),
            },
          ],
        },
      ];
    }

    return [
      {
        type: 'link',
        href: `/cars${queryString}`,
        label: 'BUY',
        onClick: (): void => this.analyticsHandler.trackBuyClicked(),
      },
      {
        type: 'link',
        href: `/sell${queryString}`,
        label: 'SELL/TRADE',
        onClick: (): void => this.analyticsHandler.trackSellTradeClicked(),
      },
      {
        type: 'link',
        href: `/finance${queryString}`,
        label: 'FINANCE',
        onClick: (): void => this.analyticsHandler.trackFinanceClicked(),
      },
      {
        type: 'dropdown',
        label: 'ABOUT',
        links: [
          {
            href: `/about${queryString}`,
            label: 'About Us',
            onClick: (): void => this.analyticsHandler.trackAboutUsClicked(),
          },
          {
            href: `/protection${queryString}`,
            label: 'Vroom Protection',
            onClick: (): void =>
              this.analyticsHandler.trackVroomProtectionClicked(),
          },
          {
            href: `/how-it-works${queryString}`,
            label: 'How It Works',
            onClick: (): void => this.analyticsHandler.trackHowItWorksClicked(),
          },
          {
            href: `/reviews${queryString}`,
            label: 'Customer Reviews',
            onClick: (): void =>
              this.analyticsHandler.trackCustomerReviewsClicked(),
          },
          {
            href: 'https://ir.vroom.com/',
            label: 'Investor Relations',
            onClick: (): void =>
              this.analyticsHandler.trackInvestorRelationsClicked(),
          },
        ],
      },
      {
        type: 'dropdown',
        label: 'CONTACT',
        links: [
          {
            href: 'https://vroom.zendesk.com/hc/en-us',
            label: 'FAQ',
            onClick: (): void => this.analyticsHandler.trackFAQClicked(),
          },
          {
            href: phoneNumberLinkData.href,
            label: phoneNumberLinkData.label,
            onClick: (): void => this.analyticsHandler.trackPhoneClicked(),
          },
          {
            href: `/contact${queryString}`,
            label: 'Contact Us',
            onClick: (): void => this.analyticsHandler.trackContactUsClicked(),
          },
        ],
      },
      {
        type: 'link',
        href: `/my-account/favorites${queryString}`,
        IconComponent: FavoritesHeartIconComponent,
        onClick: (): void => this.analyticsHandler.trackFavoritesHeartClicked(),
      },
      {
        type: 'dropdown',
        IconComponent: AccountSvg,
        label: this.getAccountLabel(),
        links: [
          {
            href: `/my-account/favorites${queryString}`,
            label: 'Favorites',
            onClick: (): void => this.analyticsHandler.trackFavoritesClicked(),
          },
          {
            href: `/my-account/profile${queryString}`,
            label: 'Profile',
            onClick: (): void => this.analyticsHandler.trackProfileClicked(),
          },
          {
            href: `/my-account/addresses${queryString}`,
            label: 'Addresses',
            onClick: (): void => this.analyticsHandler.trackAddressesClicked(),
          },
          {
            href: `/my-account/transactions${queryString}`,
            label: 'Transactions',
            onClick: (): void =>
              this.analyticsHandler.trackTransactionsClicked(),
          },
          {
            href: `/cars${queryString}`,
            label: 'Sign Out',
            onClick: this.handleSignOutClick,
          },
        ],
      },
    ];
  }

  mobileLinks(): MobileLinks {
    const phoneNumberLinkData = this.getPhoneNumberLinkData(
      this.store.phoneNumber
    );
    // FIT-566
    // Persist query string across navigation so that vlassic attribution works.
    // This is a stopgap until a better attribution system is in place.
    const queryString = this.store.queryString;
    if (!this.store.loggedIn) {
      return [
        {
          type: 'link',
          href: `/account/login${queryString}`,
          label: 'LOG IN',
          onClick: (): void => this.analyticsHandler.trackLoginClicked(),
        },
        {
          type: 'link',
          href: `/${queryString}`,
          label: 'HOME',
          onClick: (): void => this.analyticsHandler.trackHomeClicked(),
        },
        {
          type: 'link',
          href: `/cars${queryString}`,
          label: 'BUY',
          onClick: (): void => this.analyticsHandler.trackBuyClicked(),
        },
        {
          type: 'link',
          href: `/sell${queryString}`,
          label: 'SELL/TRADE',
          onClick: (): void => this.analyticsHandler.trackSellTradeClicked(),
        },
        {
          type: 'link',
          href: `/finance${queryString}`,
          label: 'FINANCE',
          onClick: (): void => this.analyticsHandler.trackFinanceClicked(),
        },
        {
          type: 'link',
          href: `/about${queryString}`,
          label: 'ABOUT US',
          onClick: (): void => this.analyticsHandler.trackAboutUsClicked(),
        },
        {
          type: 'link',
          href: `/protection${queryString}`,
          label: 'VROOM PROTECTION',
          onClick: (): void =>
            this.analyticsHandler.trackVroomProtectionClicked(),
        },
        {
          type: 'link',
          href: `/how-it-works${queryString}`,
          label: 'HOW IT WORKS',
          onClick: (): void => this.analyticsHandler.trackHowItWorksClicked(),
        },
        {
          type: 'link',
          href: `/reviews${queryString}`,
          label: 'CUSTOMER REVIEWS',
          onClick: (): void =>
            this.analyticsHandler.trackCustomerReviewsClicked(),
        },
        {
          type: 'link',
          href: 'https://ir.vroom.com/',
          label: 'INVESTOR RELATIONS',
          onClick: (): void =>
            this.analyticsHandler.trackInvestorRelationsClicked(),
        },
        {
          type: 'link',
          href: 'https://vroom.zendesk.com/hc/en-us',
          label: 'FAQ',
          onClick: (): void => this.analyticsHandler.trackFAQClicked(),
        },
        {
          type: 'link',
          href: phoneNumberLinkData.href,
          label: 'CALL',
          onClick: (): void => this.analyticsHandler.trackPhoneClicked(),
        },
        {
          type: 'link',
          href: `/contact${queryString}`,
          label: 'CONTACT US',
          onClick: (): void => this.analyticsHandler.trackContactUsClicked(),
        },
      ];
    }

    return [
      {
        type: 'dropdown',
        IconComponent: AccountSvg,
        label: this.getAccountLabel(),
        links: [
          {
            href: `/my-account/favorites${queryString}`,
            label: 'Favorites',
            onClick: (): void => this.analyticsHandler.trackFavoritesClicked(),
          },
          {
            href: `/my-account/profile${queryString}`,
            label: 'Profile',
            onClick: (): void => this.analyticsHandler.trackProfileClicked(),
          },
          {
            href: `/my-account/addresses${queryString}`,
            label: 'Addresses',
            onClick: (): void => this.analyticsHandler.trackAddressesClicked(),
          },
          {
            href: `/my-account/transactions${queryString}`,
            label: 'Transactions',
            onClick: (): void =>
              this.analyticsHandler.trackTransactionsClicked(),
          },
        ],
      },
      {
        type: 'link',
        href: `/${queryString}`,
        label: 'HOME',
        onClick: (): void => this.analyticsHandler.trackHomeClicked(),
      },
      {
        type: 'link',
        href: `/cars${queryString}`,
        label: 'BUY',
        onClick: (): void => this.analyticsHandler.trackBuyClicked(),
      },
      {
        type: 'link',
        href: `/sell${queryString}`,
        label: 'SELL/TRADE',
        onClick: (): void => this.analyticsHandler.trackSellTradeClicked(),
      },
      {
        type: 'link',
        href: `/finance${queryString}`,
        label: 'FINANCE',
        onClick: (): void => this.analyticsHandler.trackFinanceClicked(),
      },
      {
        type: 'link',
        href: `/about${queryString}`,
        label: 'ABOUT US',
        onClick: (): void => this.analyticsHandler.trackAboutUsClicked(),
      },
      {
        type: 'link',
        href: `/protection${queryString}`,
        label: 'VROOM PROTECTION',
        onClick: (): void =>
          this.analyticsHandler.trackVroomProtectionClicked(),
      },
      {
        type: 'link',
        href: `/how-it-works${queryString}`,
        label: 'HOW IT WORKS',
        onClick: (): void => this.analyticsHandler.trackHowItWorksClicked(),
      },
      {
        type: 'link',
        href: `/reviews${queryString}`,
        label: 'CUSTOMER REVIEWS',
        onClick: (): void =>
          this.analyticsHandler.trackCustomerReviewsClicked(),
      },
      {
        type: 'link',
        href: 'https://ir.vroom.com/',
        label: 'INVESTOR RELATIONS',
        onClick: (): void =>
          this.analyticsHandler.trackInvestorRelationsClicked(),
      },
      {
        type: 'link',
        href: 'https://vroom.zendesk.com/hc/en-us',
        label: 'FAQ',
        onClick: (): void => this.analyticsHandler.trackFAQClicked(),
      },
      {
        type: 'link',
        href: phoneNumberLinkData.href,
        label: 'CALL',
        onClick: (): void => this.analyticsHandler.trackPhoneClicked(),
      },
      {
        type: 'link',
        href: `/contact${queryString}`,
        label: 'CONTACT US',
        onClick: (): void => this.analyticsHandler.trackContactUsClicked(),
      },
      {
        type: 'link',
        href: `/cars${queryString}`,
        label: 'SIGN OUT',
        onClick: this.handleSignOutClick,
      },
    ];
  }
}

export default HeaderNavViewModel;
