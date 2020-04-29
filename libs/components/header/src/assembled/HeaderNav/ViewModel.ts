import { DesktopLinks, MobileLinks } from '../../components/Nav';
import { ReactComponent as AccountSvg } from '../../svg/account.svg';
import HeaderNavStore from './store';

class HeaderNavViewModel {
  private store: HeaderNavStore;

  constructor(store: HeaderNavStore) {
    this.store = store;
  }

  handleMount(): void {
    this.store.checkLoggedInClientSide();
  }

  private handleSignOutClick = (): void => {
    this.store.signOut();
  };

  desktopLinks(): DesktopLinks {
    if (!this.store.loggedIn) {
      return [
        {
          type: 'link',
          href: '/catalog',
          label: 'Buy',
        },
        {
          type: 'link',
          href: '/sell',
          label: 'Sell/Trade',
        },
        {
          type: 'link',
          href: '/finance',
          label: 'Finance',
        },
        {
          type: 'dropdown',
          label: 'About',
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
          label: 'Contact',
          links: [
            {
              href: 'https://vroom.zendesk.com/hc/en-us',
              label: 'FAQ',
            },
            // TODO: figure out phone link
            {
              href: '/contact',
              label: 'Contact Us',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Log In',
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
        label: 'Buy',
      },
      {
        type: 'link',
        href: '/sell',
        label: 'Sell/Trade',
      },
      {
        type: 'link',
        href: '/finance',
        label: 'Finance',
      },
      {
        type: 'dropdown',
        label: 'About',
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
        label: 'Contact',
        links: [
          {
            href: 'https://vroom.zendesk.com/hc/en-us',
            label: 'FAQ',
          },
          // TODO: figure out phone link
          {
            href: '/contact',
            label: 'Contact Us',
          },
        ],
      },
      {
        type: 'dropdown',
        IconComponent: AccountSvg,
        label: 'Account', // TODO add user's initials
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
            href: '/catalog',
            label: 'Sign Out',
            onClick: this.handleSignOutClick,
          },
        ],
      },
    ];
  }

  mobileLinks(): MobileLinks {
    if (!this.store.loggedIn) {
      return [
        {
          type: 'link',
          href: '/account/login',
          label: 'Log In',
        },
        {
          type: 'link',
          href: '/',
          label: 'Home',
        },
        {
          type: 'link',
          href: '/catalog',
          label: 'Buy',
        },
        {
          type: 'link',
          href: '/sell',
          label: 'Sell/Trade',
        },
        {
          type: 'link',
          href: '/finance',
          label: 'Finance',
        },
        {
          type: 'link',
          href: '/about',
          label: 'About Us',
        },
        {
          type: 'link',
          href: '/protection',
          label: 'Vroom Protection',
        },
        {
          type: 'link',
          href: '/how-it-works',
          label: 'How It Works',
        },
        {
          type: 'link',
          href: '/reviews',
          label: 'Customer Reviews',
        },
        {
          type: 'link',
          href: 'https://vroom.zendesk.com/hc/en-us',
          label: 'FAQ',
        },
        // TODO: figure out phone link.
        {
          type: 'link',
          href: '/contact',
          label: 'Contact Us',
        },
      ];
    }

    return [
      {
        type: 'dropdown',
        IconComponent: AccountSvg,
        label: 'Account',
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
            href: '/catalog',
            label: 'Sign Out',
            onClick: this.handleSignOutClick,
          },
        ],
      },
      {
        type: 'link',
        href: '/',
        label: 'Home',
      },
      {
        type: 'link',
        href: '/catalog',
        label: 'Buy',
      },
      {
        type: 'link',
        href: '/sell',
        label: 'Sell/Trade',
      },
      {
        type: 'link',
        href: '/finance',
        label: 'Finance',
      },
      {
        type: 'link',
        href: '/about',
        label: 'About Us',
      },
      {
        type: 'link',
        href: '/protection',
        label: 'Vroom Protection',
      },
      {
        type: 'link',
        href: '/how-it-works',
        label: 'How It Works',
      },
      {
        type: 'link',
        href: '/reviews',
        label: 'Customer Reviews',
      },
      {
        type: 'link',
        href: 'https://vroom.zendesk.com/hc/en-us',
        label: 'FAQ',
      },
      // TODO: figure out phone link.
      {
        type: 'link',
        href: '/contact',
        label: 'Contact Us',
      },
    ];
  }
}

export default HeaderNavViewModel;
