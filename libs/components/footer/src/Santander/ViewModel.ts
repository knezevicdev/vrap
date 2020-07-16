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

class ViewModel {
  //TODO: ADD href and target
  readonly sections: Section[] = [
    {
      title: 'Learning Center',
      links: [
        { label: 'Finance calculators', href: `` },
        { label: 'Blog', href: `` },
        { label: 'Financial Education', href: `` },
      ],
    },
    {
      title: 'Help & Support',
      links: [
        { label: 'Payment Options', href: `` },
        { label: 'Contact Us', href: `` },
        { label: 'Accessibility Services', href: `` },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms & Conditions', href: `` },
        { label: 'Privacy & Security', href: `` },
        { label: 'Fair Lending', href: `` },
        { label: "Service Member's Civil Relief Act", href: `` },
      ],
    },
  ];
  readonly copyrightLabel =
    '© 2020 Santander Consumer USA Inc. and its Licensors. All Rights Reserved.';
  readonly copyrightLink = { label: 'NMLS Consumer Access ID 4239.', href: '' };
  readonly trademark =
    'Chrysler Capital is a registered trademark of FCA US LLC and licensed to Santander Consumer USA Inc. Chrysler, Dodge, Jeep, Ram, Mopar and SRT are registered trademarks of FCA US LLC. ALFA ROMEO and FIAT are registered trademarks of FCA Group Marketing S.p.A., used with permission.';
  readonly poweredBy = 'Powered by';
}

export default ViewModel;
