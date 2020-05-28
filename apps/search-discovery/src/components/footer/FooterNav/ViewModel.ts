interface Link {
  external: boolean;
  href: string;
  label: string;
  target?: string;
}

class FooterNavViewModel {
  readonly title: string = 'Legal';
  readonly links: Link[] = [
    {
      external: false,
      label: 'Privacy Policy',
      href: '/rocket-auto-privacy-policy',
    },
    {
      external: false,
      label: 'Terms of Use',
      href: '/rocket-auto-terms-of-use',
    },
    {
      external: false,
      label: 'Contact Us',
      href: '/contact-us',
    },
  ];
}

export default FooterNavViewModel;
