interface Link {
  external: boolean;
  href: string;
  label: string;
  target?: string;
}

class FooterNavViewModel {
  links(): Link[] {
    return [
      {
        external: false,
        label: 'Contact Us',
        href: '/contact-us',
      },
      {
        external: true,
        label: 'Privacy Policy',
        href: 'https://www.vroom.com/legal/privacy-policy',
        target: '_blank',
      },
      {
        external: true,
        label: 'Terms of Use',
        href: 'https://www.vroom.com/legal/terms-of-use',
        target: '_blank',
      },
      {
        external: true,
        label: 'Do Not Sell My Information',
        href:
          'https://privacyportal-cdn.onetrust.com/dsarwebform/8086730d-99f7-48ea-b3a1-0b3bb0cf163e/aa3e2126-7439-411d-a9a2-9fa0c4f8b01d.html',
        target: '_blank',
      },
    ];
  }
}

export default FooterNavViewModel;
