import HeaderNavStore from './store';
import ViewModel from './ViewModel';

describe('desktopLinks()', () => {
  test('logged out, default phone number', () => {
    const mockStore = {
      loggedIn: false,
    };
    const viewModel = new ViewModel(mockStore as HeaderNavStore);
    expect(viewModel.desktopLinks()).toEqual([
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
          {
            href: 'tel:+18555241300',
            label: '(855) 524-1300',
          },
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
    ]);
  });

  test('logged in, default phone number', () => {
    const mockStore = {
      loggedIn: true,
    };
    const viewModel = new ViewModel(mockStore as HeaderNavStore);
    expect(viewModel.desktopLinks()).toEqual([
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
          {
            href: 'tel:+18555241300',
            label: '(855) 524-1300',
          },
          {
            href: '/contact',
            label: 'Contact Us',
          },
        ],
      },
      {
        type: 'dropdown',
        IconComponent: 'IconMock',
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
            onClick: expect.any(Function),
          },
        ],
      },
    ]);
  });

  test('logged out, set phone number', () => {
    const mockStore = {
      loggedIn: false,
      phoneNumber: '(855) 524-9000',
    };
    const viewModel = new ViewModel(mockStore as HeaderNavStore);
    expect(viewModel.desktopLinks()).toEqual([
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
          {
            href: 'tel:+18555249000',
            label: '(855) 524-9000',
          },
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
    ]);
  });

  test('logged in, set phone number', () => {
    const mockStore = {
      loggedIn: true,
      phoneNumber: '(855) 524-9000',
    };
    const viewModel = new ViewModel(mockStore as HeaderNavStore);
    expect(viewModel.desktopLinks()).toEqual([
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
          {
            href: 'tel:+18555249000',
            label: '(855) 524-9000',
          },
          {
            href: '/contact',
            label: 'Contact Us',
          },
        ],
      },
      {
        type: 'dropdown',
        IconComponent: 'IconMock',
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
            onClick: expect.any(Function),
          },
        ],
      },
    ]);
  });
});

describe('mobileLinks()', () => {
  test('logged out, default phone number', () => {
    const mockStore = {
      loggedIn: false,
    };
    const viewModel = new ViewModel(mockStore as HeaderNavStore);
    expect(viewModel.mobileLinks()).toEqual([
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
      {
        type: 'link',
        href: 'tel:+18555241300',
        label: 'Call',
      },
      {
        type: 'link',
        href: '/contact',
        label: 'Contact Us',
      },
    ]);
  });

  test('logged in, default phone number', () => {
    const mockStore = {
      loggedIn: true,
    };
    const viewModel = new ViewModel(mockStore as HeaderNavStore);
    expect(viewModel.mobileLinks()).toEqual([
      {
        type: 'dropdown',
        IconComponent: 'IconMock',
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
            onClick: expect.any(Function),
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
      {
        type: 'link',
        href: 'tel:+18555241300',
        label: 'Call',
      },
      {
        type: 'link',
        href: '/contact',
        label: 'Contact Us',
      },
    ]);
  });

  test('logged out, default phone number', () => {
    const mockStore = {
      loggedIn: false,
      phoneNumber: '(855) 524-9000',
    };
    const viewModel = new ViewModel(mockStore as HeaderNavStore);
    expect(viewModel.mobileLinks()).toEqual([
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
      {
        type: 'link',
        href: 'tel:+18555249000',
        label: 'Call',
      },
      {
        type: 'link',
        href: '/contact',
        label: 'Contact Us',
      },
    ]);
  });

  test('logged in, set phone number', () => {
    const mockStore = {
      loggedIn: true,
      phoneNumber: '(855) 524-9000',
    };
    const viewModel = new ViewModel(mockStore as HeaderNavStore);
    expect(viewModel.mobileLinks()).toEqual([
      {
        type: 'dropdown',
        IconComponent: 'IconMock',
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
            onClick: expect.any(Function),
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
      {
        type: 'link',
        href: 'tel:+18555249000',
        label: 'Call',
      },
      {
        type: 'link',
        href: '/contact',
        label: 'Contact Us',
      },
    ]);
  });
});
