interface VroomData {
  brand: string;
  sitePhoneNumber: string;
  uuid: string;
  geo: {
    city: string;
    region: string;
    metroCode: string;
    postalCode: string;
    latitude: string;
    longitude: string;
  };
}

declare global {
  interface Window {
    __vroom_data: VroomData;
  }
}

class FooterViewModel {
  private getWindow = (): undefined | Window => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    return window;
  };

  private getVroomData = (): undefined | VroomData => {
    const window = this.getWindow();
    if (!window) {
      return undefined;
    }

    if (!window.__vroom_data) {
      return undefined;
    }

    return window.__vroom_data;
  };

  private getSitePhoneNumber = (): undefined | string => {
    const vroomData = this.getVroomData();

    if (!vroomData) {
      return undefined;
    }

    if (!vroomData.sitePhoneNumber || vroomData.sitePhoneNumber === '') {
      return undefined;
    }

    return vroomData.sitePhoneNumber;
  };

  private getPhoneNumber = (): { name: string; href: string } => {
    const boomerangNumber = this.getSitePhoneNumber();

    const defaultNumber = {
      name: '(855) 524-1300',
      href: 'tel:+18555241300',
    };

    if (boomerangNumber) {
      const space = '%20';
      const nonNumber = /[^0-9]/g;
      const name = boomerangNumber.replace(space, ' ');
      const href = 'tel:+' + name.replace(nonNumber, '');

      return {
        name: name,
        href: href,
      };
    }

    return defaultNumber;
  };

  readonly vroomLink = 'https://www.vroom.com/';

  readonly appMessage = 'GET THE VROOM APP';

  readonly appLinks = {
    google:
      'https://play.google.com/store/apps/details?id=com.vroom.app.android',
    apple: 'https://apps.apple.com/app/apple-store/id1494048038?pt=120897984',
  };

  readonly socialLinks = {
    facebook: 'https://www.facebook.com/vroom',
    twitter: 'https://www.twitter.com/vroomcars',
    instagram: 'https://www.instagram.com/vroom',
  };

  readonly copyrightMessage = '©2020 VROOM. ALL RIGHTS RESERVED.';

  readonly sections = [
    {
      title: 'Vroom',
      links: [
        {
          href: '/cars',
          name: 'Buy',
        },
        {
          href: '/sell',
          name: 'Sell/Trade',
        },
        {
          href: '/finance',
          name: 'Finance',
        },
      ],
    },
    {
      title: 'About',
      links: [
        {
          href: '/about',
          name: 'About Us',
        },
        {
          href: '/protection',
          name: 'Vroom Protection',
        },
        {
          href: '/how-it-works',
          name: 'How It Works',
        },
        {
          href: 'https://ir.vroom.com/',
          name: 'Investor Relations',
        },
      ],
    },
    {
      title: 'Contact',
      links: [
        this.getPhoneNumber(),
        {
          href: 'https://vroom.zendesk.com/hc/en-us',
          name: 'FAQ',
        },
        {
          href: '/contact',
          name: 'Contact Us',
        },
      ],
    },
    {
      title: 'Company',
      links: [
        {
          href: '/legal/privacy-policy',
          name: 'Privacy Policy',
        },
        {
          href: '/legal/terms-of-use',
          name: 'Terms of use',
        },
        {
          href: '/careers',
          name: 'Careers',
        },
        {
          href:
            'https://privacyportal.onetrust.com/webform/8086730d-99f7-48ea-b3a1-0b3bb0cf163e/aa3e2126-7439-411d-a9a2-9fa0c4f8b01d',
          name: 'Do Not Sell My Info (CA Residents)',
        },
      ],
    },
  ];
}

export default FooterViewModel;
