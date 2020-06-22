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

  handleMount(): void {
    this.store.initClientSide();
  }

  private getPhoneNumberLinkData = (phoneNumber?: string): Link => {
    const defaultPhoneNumberLinkData: Link = {
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
    const phoneNumberLinkData: Link = {
      href: parsedPhoneNumber.getURI(),
      label: parsedPhoneNumber.formatNational(),
    };
    return phoneNumberLinkData;
  };

  links(): Section[] {
    return [
      {
        title: 'Vroom',
        links: [
          {
            label: 'Buy',
            href: `/catalog`,
          },
          {
            label: 'Sell/Trade',
            href: `/sell`,
          },
          {
            label: 'Finance',
            href: `/finance`,
          },
        ],
      },
      {
        title: 'About',
        links: [
          {
            label: 'About Us',
            href: `/about`,
          },
          {
            label: 'Vroom Protection',
            href: `/protection`,
          },
          {
            label: 'How It Works',
            href: `/how-it-works`,
          },
        ],
      },
      {
        title: 'Contact',
        links: [
          this.getPhoneNumberLinkData(this.store.phoneNumber),
          {
            label: 'FAQ',
            href: 'https://vroom.zendesk.com/hc/en-us',
            target: '_blank',
            rel: 'noopener',
          },
          {
            label: 'Contact Us',
            href: `/contact`,
          },
        ],
      },
      {
        title: 'Company',
        links: [
          {
            label: 'Privacy Policy',
            href: `/legal/privacy-policy`,
          },
          {
            label: 'Terms of Use',
            href: `/legal/terms-of-use`,
          },
          {
            label: 'Careers',
            href: `/careers`,
            target: '_blank',
          },
          {
            label: 'Do Not Sell My Information',
            href:
              'https://privacyportal-cdn.onetrust.com/dsarwebform/8086730d-99f7-48ea-b3a1-0b3bb0cf163e/aa3e2126-7439-411d-a9a2-9fa0c4f8b01d.html',
            target: '_blank',
            rel: 'noopener',
          },
        ],
      },
    ];
  }
}

export default NavigationViewModel;
