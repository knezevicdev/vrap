interface Link {
  external: boolean;
  href: string;
  label: string;
  target?: string;
}

interface Section {
  title: string;
  links: Link[];
}

class NavigationViewModel {
  links(): Section[] {
    return [
      {
        title: 'Vroom',
        links: [
          {
            external: true,
            label: 'Buy',
            href: `/catalog`,
          },
          {
            external: true,
            label: 'Sell/Trade',
            href: `/sell`,
          },
          {
            external: true,
            label: 'Finance',
            href: `/finance`,
          },
        ],
      },
      {
        title: 'About',
        links: [
          {
            external: true,
            label: 'About Us',
            href: `/about`,
          },
          {
            external: true,
            label: 'Vroom Protection',
            href: `/protection`,
          },
          {
            external: true,
            label: 'How It Works',
            href: `/how-it-works`,
          },
        ],
      },
      {
        title: 'Contact',
        links: [
          // TODO: Needs to use api / cookie
          {
            external: true,
            label: '(855) 524-1300',
            href: 'tel:+1(855) 524-1300',
          },
          {
            external: true,
            label: 'FAQ',
            href: 'https://vroom.zendesk.com/hc/en-us',
            target: '_blank',
          },
          {
            external: true,
            label: 'Contact Us',
            href: `/contact`,
          },
        ],
      },
      {
        title: 'Company',
        links: [
          {
            external: true,
            label: 'Privacy Policy',
            href: `/legal/privacy-policy`,
          },
          {
            external: true,
            label: 'Terms of Use',
            href: `/legal/terms-of-use`,
          },
          {
            external: true,
            label: 'Careers',
            href: `/careers`,
            target: '_blank',
          },
          // {
          //   external: true,
          //   label: 'Do Not Sell My Information',
          //   href:
          //     'https://privacyportal-cdn.onetrust.com/dsarwebform/8086730d-99f7-48ea-b3a1-0b3bb0cf163e/aa3e2126-7439-411d-a9a2-9fa0c4f8b01d.html',
          //   target: '_blank',
          // },
        ],
      },
    ];
  }
}

export default NavigationViewModel;
