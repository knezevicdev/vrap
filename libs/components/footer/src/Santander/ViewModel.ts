import AnalyticsHandler from './integrations/AnalyticsHandler';

interface Link {
  href?: string;
  label: string;
  target?: string;
  rel?: string;
  handleAnalytics: () => void;
}

interface Section {
  title: Link;
  links: Link[];
}

class ViewModel {
  private analyticsHandler = new AnalyticsHandler();

  readonly sections: Section[] = [
    {
      title: {
        label: 'Learning Center',
        href: 'https://santanderconsumerusa.com/learning-center',
        target: '_blank',
        handleAnalytics: this.analyticsHandler.trackLinkClicked(
          'Learning Center'
        ),
      },
      links: [
        {
          label: 'Finance Calculators',
          href: `https://santanderconsumerusa.com/learning-center/finance-calculators`,
          target: '_blank',
          handleAnalytics: this.analyticsHandler.trackLinkClicked(
            'Finance Calculators'
          ),
        },
        {
          label: 'Blog',
          href: `https://santanderconsumerusa.com/blog`,
          target: '_blank',
          handleAnalytics: this.analyticsHandler.trackLinkClicked('Blog'),
        },
      ],
    },
    {
      title: {
        label: 'Help & Support',
        href: 'https://santanderconsumerusa.com/support',
        target: '_blank',
        handleAnalytics: this.analyticsHandler.trackLinkClicked(
          'Help & Support'
        ),
      },
      links: [
        {
          label: 'Payment Options',
          href: `https://santanderconsumerusa.com/support/payments`,
          target: '_blank',
          handleAnalytics: this.analyticsHandler.trackLinkClicked(
            'Payment Options'
          ),
        },
        {
          label: 'Contact Us',
          href: `/contact`,
          handleAnalytics: this.analyticsHandler.trackLinkClicked('Contact Us'),
        },
        {
          label: 'Accessibility Services',
          href: `https://santanderconsumerusa.com/our-company/accessibility`,
          target: '_blank',
          handleAnalytics: this.analyticsHandler.trackLinkClicked(
            'Accessibility Services'
          ),
        },
      ],
    },
    {
      title: {
        label: 'Legal',
        href: undefined,
        handleAnalytics: this.analyticsHandler.trackLinkClicked('Legal'),
      },
      links: [
        {
          label: 'Terms & Conditions',
          href: `https://santanderconsumerusa.com/legal/terms-conditions`,
          target: '_blank',
          handleAnalytics: this.analyticsHandler.trackLinkClicked(
            'Terms & Conditions'
          ),
        },
        {
          label: 'Privacy & Security',
          href: `https://santanderconsumerusa.com/legal/privacy-security`,
          target: '_blank',
          handleAnalytics: this.analyticsHandler.trackLinkClicked(
            'Privacy & Security'
          ),
        },
        {
          label: 'Fair Lending',
          href: `https://santanderconsumerusa.com/legal/fair-lending`,
          target: '_blank',
          handleAnalytics: this.analyticsHandler.trackLinkClicked(
            'Fair Lending'
          ),
        },
        {
          label: 'Servicemembers Civil Relief Act',
          href: `https://santanderconsumerusa.com/legal/servicemembers-civil-relief-act`,
          target: '_blank',
          handleAnalytics: this.analyticsHandler.trackLinkClicked(
            'Servicemembers Civil Relief Act'
          ),
        },
      ],
    },
  ];
  readonly copyrightLabel =
    '© 2020 Santander Consumer USA Inc. and its Licensors. All Rights Reserved.';
  readonly copyrightLink: Link = {
    label: 'NMLS Consumer Access ID 4239.',
    href: 'http://www.nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/4239',
    target: '_blank',
    handleAnalytics: this.analyticsHandler.trackLinkClicked(
      'NMLS Consumer Access ID 4239.'
    ),
  };
  readonly trademark =
    'Chrysler Capital is a registered trademark of FCA US LLC and licensed to Santander Consumer USA Inc. Chrysler, Dodge, Jeep, Ram, Mopar and SRT are registered trademarks of FCA US LLC. ALFA ROMEO and FIAT are registered trademarks of FCA Group Marketing S.p.A., used with permission.';
  readonly poweredBy = 'Powered by';
}

export default ViewModel;
