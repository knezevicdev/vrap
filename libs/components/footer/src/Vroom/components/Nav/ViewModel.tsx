import { parsePhoneNumberFromString } from 'libphonenumber-js';

import NavStore from './store';

interface Link {
  href: string;
  label: string;
  target?: string;
  rel?: string;
}

interface Section {
  title: string;
  links: Link[];
}

class NavigationViewModel {
  private store: NavStore;

  constructor(store: NavStore) {
    this.store = store;
  }

  private getPhoneNumberLinkData = (): Link => {
    const defaultPhoneNumberLinkData: Link = {
      href: 'tel:+18555241300',
      label: '(855) 524-1300',
    };

    if (!this.store.phoneNumber) {
      return defaultPhoneNumberLinkData;
    }

    const parsedPhoneNumber = parsePhoneNumberFromString(
      decodeURIComponent(this.store.phoneNumber),
      'US'
    );

    if (!parsedPhoneNumber) {
      return defaultPhoneNumberLinkData;
    }
    if (!parsedPhoneNumber.isValid()) {
      return defaultPhoneNumberLinkData;
    }
    const phoneNumberLinkData: Link = {
      href: parsedPhoneNumber.getURI(),
      label: parsedPhoneNumber.formatNational(),
    };
    return phoneNumberLinkData;
  };

  links(): Section[] {
    // FIT-566
    // Persist query string across navigation so that vlassic attribution works.
    // This is a stopgap until a better attribution system is in place.
    const queryString = this.store.queryString;
    return [
      {
        title: 'Vroom',
        links: [
          {
            label: 'Buy',
            href: `/cars${queryString}`,
          },
          {
            label: 'Sell/Trade',
            href: `/sell${queryString}`,
          },
          {
            label: 'Finance',
            href: `/finance${queryString}`,
          },
        ],
      },
      {
        title: 'About',
        links: [
          {
            label: 'About Us',
            href: `/about${queryString}`,
          },
          {
            label: 'Vroom Protection',
            href: `/protection${queryString}`,
          },
          {
            label: 'How It Works',
            href: `/how-it-works${queryString}`,
          },
          {
            label: 'Investor Relations',
            href: `https://ir.vroom.com`,
          },
        ],
      },
      {
        title: 'Contact',
        links: [
          this.getPhoneNumberLinkData(),
          {
            label: 'FAQ',
            href: 'https://vroom.zendesk.com/hc/en-us',
            target: '_blank',
            rel: 'noopener',
          },
          {
            label: 'Contact Us',
            href: `/contact${queryString}`,
          },
        ],
      },
      {
        title: 'Company',
        links: [
          {
            label: 'Privacy Policy',
            href: `/legal/privacy-policy${queryString}`,
          },
          {
            label: 'Terms of Use',
            href: `/legal/terms-of-use${queryString}`,
          },
          {
            label: 'Careers',
            href: `/careers${queryString}`,
            target: '_blank',
          },
          {
            label: 'Do Not Sell My Info (CA Residents)',
            href:
              'https://privacyportal.onetrust.com/webform/8086730d-99f7-48ea-b3a1-0b3bb0cf163e/aa3e2126-7439-411d-a9a2-9fa0c4f8b01d',
            target: '_blank',
            rel: 'noopener',
          },
        ],
      },
    ];
  }
}

export default NavigationViewModel;
