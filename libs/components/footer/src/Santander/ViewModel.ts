interface Link {
  href?: string;
  label: string;
  target?: string;
  rel?: string;
}

interface Section {
  title: Link;
  links: Link[];
}

class ViewModel {
  readonly sections: Section[] = [
    {
      title: {
        label: 'Learning Center',
        href: 'https://santanderconsumerusa.com/learning-center',
        target: '_blank',
      },
      links: [
        {
          label: 'Finance calculators',
          href: `https://santanderconsumerusa.com/learning-center/finance-calculators`,
          target: '_blank',
        },
        {
          label: 'Blog',
          href: `https://santanderconsumerusa.com/blog`,
          target: '_blank',
        },
        {
          label: 'Financial Education',
          href: `https://santanderconsumerusa.com/learning-center/financial-education`,
          target: '_blank',
        },
      ],
    },
    {
      title: {
        label: 'Help & Support',
        href: 'https://santanderconsumerusa.com/support',
        target: '_blank',
      },
      links: [
        {
          label: 'Payment Options',
          href: `https://santanderconsumerusa.com/support/payments`,
          target: '_blank',
        },
        { label: 'Contact Us', href: `/contact` },
        {
          label: 'Accessibility Services',
          href: `https://santanderconsumerusa.com/our-company/accessibility`,
          target: '_blank',
        },
      ],
    },
    {
      title: { label: 'Legal', href: undefined },
      links: [
        {
          label: 'Terms & Conditions',
          href: `https://santanderconsumerusa.com/legal/terms-conditions`,
          target: '_blank',
        },
        {
          label: 'Privacy & Security',
          href: `https://santanderconsumerusa.com/legal/privacy-security`,
          target: '_blank',
        },
        {
          label: 'Fair Lending',
          href: `https://santanderconsumerusa.com/legal/fair-lending`,
          target: '_blank',
        },
        {
          label: "Service Member's Civil Relief Act",
          href: `https://santanderconsumerusa.com/legal/servicemembers-civil-relief-act`,
          target: '_blank',
        },
      ],
    },
  ];
  readonly copyrightLabel =
    '© 2020 Santander Consumer USA Inc. and its Licensors. All Rights Reserved.';
  readonly copyrightLink = {
    label: 'NMLS Consumer Access ID 4239.',
    href: '', //TODO: Come back to this after Sarah is back.
    target: '_blank',
  };
  readonly trademark =
    'Chrysler Capital is a registered trademark of FCA US LLC and licensed to Santander Consumer USA Inc. Chrysler, Dodge, Jeep, Ram, Mopar and SRT are registered trademarks of FCA US LLC. ALFA ROMEO and FIAT are registered trademarks of FCA Group Marketing S.p.A., used with permission.';
  readonly poweredBy = 'Powered by';
}

export default ViewModel;
