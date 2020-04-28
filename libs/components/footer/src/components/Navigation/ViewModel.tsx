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
  private readonly vroomUrl: string = 'https://vroom.com';
  links(): Section[] {
    return [
      {
        title: 'Vroom',
        links: [
          {
            external: true,
            label: 'Buy',
            href: `${this.vroomUrl}/catalog`,
          },
          {
            external: true,
            label: 'Sell/Trade',
            href: `${this.vroomUrl}/sell`,
          },
          {
            external: true,
            label: 'Finance',
            href: `${this.vroomUrl}/finance`,
          },
        ],
      },
      {
        title: 'About',
        links: [
          {
            external: true,
            label: 'About Us',
            href: `${this.vroomUrl}/about`,
          },
          {
            external: true,
            label: 'Vroom Protection',
            href: `${this.vroomUrl}/protection`,
          },
          {
            external: true,
            label: 'How It Works',
            href: `${this.vroomUrl}/how-it-works`,
          },
        ],
      },
      {
        title: 'Contact',
        links: [
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
            href: `${this.vroomUrl}/contact`,
          },
        ],
      },
      {
        title: 'Company',
        links: [
          {
            external: true,
            label: 'Privacy Policy',
            href: `${this.vroomUrl}/legal/privacy-policy`,
          },
          {
            external: true,
            label: 'Terms of Use',
            href: `${this.vroomUrl}/legal/terms-of-use`,
          },
          {
            external: true,
            label: 'Careers',
            href: `${this.vroomUrl}/careers`,
            target: '_blank',
          },
          {
            external: true,
            label: 'Do Not Sell My Information',
            href:
              'https://privacyportal-cdn.onetrust.com/dsarwebform/8086730d-99f7-48ea-b3a1-0b3bb0cf163e/aa3e2126-7439-411d-a9a2-9fa0c4f8b01d.html',
            target: '_blank',
          },
        ],
      },
    ];
  }
}

export default NavigationViewModel;
