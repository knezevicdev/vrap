import { parsePhoneNumberFromString } from 'libphonenumber-js';

import { DesktopLinks, MobileLinks } from '../../components/Nav';
import { ReactComponent as AccountSvg } from '../../svg/account.svg';
import FavoritesHeartIconComponent from './FavoritesHeartIconComponent';
import HeaderNavStore from './store';

interface PhoneNumberLinkData {
  href: string;
  label: string;
}

class HeaderNavViewModel {
  private store: HeaderNavStore;

  constructor(store: HeaderNavStore) {
    this.store = store;
  }

  handleMount(): void {
    this.store.initClientSide();
  }

  private handleSignOutClick = (): void => {
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
    const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, 'US');
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
    if (!this.store.loggedIn) {
      return [
        {
          type: 'link',
          href: '/catalog',
          label: 'BUY',
        },
        {
          type: 'link',
          href: '/sell',
          label: 'SELL/TRADE',
        },
        {
          type: 'link',
          href: '/finance',
          label: 'FINANCE',
        },
        {
          type: 'dropdown',
          label: 'ABOUT',
          links: [
            {
              href: '/about',
              label: 'About Us',
            },
            {
              href: '/protection',
              label: 'Vroom Protection',
            },
            {
              href: '/how-it-works',
              label: 'How It Works',
            },
            {
              href: '/reviews',
              label: 'Customer Reviews',
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
            },
            {
              href: phoneNumberLinkData.href,
              label: phoneNumberLinkData.label,
            },
            {
              href: '/contact',
              label: 'Contact Us',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'LOG IN',
          links: [
            {
              href: '/account/login',
              label: 'Log In / Register',
            },
            {
              href: '/my-account/favorites',
              label: 'Favorites',
            },
            {
              href: '/my-account/profile',
              label: 'Profile',
            },
          ],
        },
      ];
    }

    return [
      {
        type: 'link',
        href: '/catalog',
        label: 'BUY',
      },
      {
        type: 'link',
        href: '/sell',
        label: 'SELL/TRADE',
      },
      {
        type: 'link',
        href: '/finance',
        label: 'FINANCE',
      },
      {
        type: 'dropdown',
        label: 'ABOUT',
        links: [
          {
            href: '/about',
            label: 'About Us',
          },
          {
            href: '/protection',
            label: 'Vroom Protection',
          },
          {
            href: '/how-it-works',
            label: 'How It Works',
          },
          {
            href: '/reviews',
            label: 'Customer Reviews',
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
          },
          {
            href: phoneNumberLinkData.href,
            label: phoneNumberLinkData.label,
          },
          {
            href: '/contact',
            label: 'Contact Us',
          },
        ],
      },
      {
        type: 'link',
        href: '/my-account/favorites',
        IconComponent: FavoritesHeartIconComponent,
      },
      {
        type: 'dropdown',
        IconComponent: AccountSvg,
        label: this.getAccountLabel(),
        links: [
          {
            href: '/my-account/favorites',
            label: 'Favorites',
          },
          {
            href: '/my-account/profile',
            label: 'Profile',
          },
          {
            href: '/my-account/addresses',
            label: 'Addresses',
          },
          {
            href: '/my-account/transactions',
            label: 'Transactions',
          },
          {
            href: '/catalog',
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
    if (!this.store.loggedIn) {
      return [
        {
          type: 'link',
          href: '/account/login',
          label: 'LOG IN',
        },
        {
          type: 'link',
          href: '/',
          label: 'HOME',
        },
        {
          type: 'link',
          href: '/catalog',
          label: 'BUY',
        },
        {
          type: 'link',
          href: '/sell',
          label: 'SELL/TRADE',
        },
        {
          type: 'link',
          href: '/finance',
          label: 'FINANCE',
        },
        {
          type: 'link',
          href: '/about',
          label: 'ABOUT US',
        },
        {
          type: 'link',
          href: '/protection',
          label: 'VROOM PROTECTION',
        },
        {
          type: 'link',
          href: '/how-it-works',
          label: 'HOW IT WORKS',
        },
        {
          type: 'link',
          href: '/reviews',
          label: 'CUSTOMER REVIEWS',
        },
        {
          type: 'link',
          href: 'https://vroom.zendesk.com/hc/en-us',
          label: 'FAQ',
        },
        {
          type: 'link',
          href: phoneNumberLinkData.href,
          label: 'CALL',
        },
        {
          type: 'link',
          href: '/contact',
          label: 'CONTACT US',
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
            href: '/my-account/favorites',
            label: 'Favorites',
          },
          {
            href: '/my-account/profile',
            label: 'Profile',
          },
          {
            href: '/my-account/addresses',
            label: 'Addresses',
          },
          {
            href: '/my-account/transactions',
            label: 'Transactions',
          },
        ],
      },
      {
        type: 'link',
        href: '/',
        label: 'HOME',
      },
      {
        type: 'link',
        href: '/catalog',
        label: 'BUY',
      },
      {
        type: 'link',
        href: '/sell',
        label: 'SELL/TRADE',
      },
      {
        type: 'link',
        href: '/finance',
        label: 'FINANCE',
      },
      {
        type: 'link',
        href: '/about',
        label: 'ABOUT US',
      },
      {
        type: 'link',
        href: '/protection',
        label: 'VROOM PROTECTION',
      },
      {
        type: 'link',
        href: '/how-it-works',
        label: 'HOW IT WORKS',
      },
      {
        type: 'link',
        href: '/reviews',
        label: 'CUSTOMER REVIEWS',
      },
      {
        type: 'link',
        href: 'https://vroom.zendesk.com/hc/en-us',
        label: 'FAQ',
      },
      {
        type: 'link',
        href: phoneNumberLinkData.href,
        label: 'CALL',
      },
      {
        type: 'link',
        href: '/contact',
        label: 'CONTACT US',
      },
      {
        type: 'link',
        href: '/catalog',
        label: 'SIGN OUT',
        onClick: this.handleSignOutClick,
      },
    ];
  }
}

export default HeaderNavViewModel;
