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
  readonly vroomUrl: string = '';
  readonly sections: Section[];

  constructor(vroomUrl?: string) {
    if (vroomUrl) this.vroomUrl = vroomUrl;
    this.sections = [
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
            handleAnalytics: this.analyticsHandler.trackLinkClicked(
              'Contact Us'
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
            label: 'Privacy Policy',
            href: `${this.vroomUrl}/legal/privacy-policy${this.utmParams}`,
            target: '_blank',
            handleAnalytics: this.analyticsHandler.trackLinkClicked(
              'Privacy Policy'
            ),
          },
          {
            label: 'Terms of Use',
            href: `${this.vroomUrl}/legal/terms-of-use${this.utmParams}`,
            target: '_blank',
            handleAnalytics: this.analyticsHandler.trackLinkClicked(
              'Terms of Use'
            ),
          },
          {
            label: 'Do Not Sell My Info (CA Residents)',
            href: `https://privacyportal.onetrust.com/webform/8086730d-99f7-48ea-b3a1-0b3bb0cf163e/aa3e2126-7439-411d-a9a2-9fa0c4f8b01d`,
            target: '_blank',
            handleAnalytics: this.analyticsHandler.trackLinkClicked(
              'Do Not Sell My Info (CA Residents)'
            ),
          },
        ],
      },
    ];
  }

  readonly utmParams: string =
    '?utm_source=vroom_subdomain&utm_medium=referral&utm_campaign=vroom';

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
  readonly poweredBy = 'Powered by';
  readonly disclaimer = `Vehicle marketing, inventory, sales and the car-buying transaction are performed, hosted, managed and/or coordinated by Vroom. Santander Consumer USA Inc., its subsidiaries or affiliates are not responsible for the transaction, the outcome of the transaction or any information provided therein, provided that if Santander Consumer is chosen as the lender to finance the vehicle purchase, the financing will be performed by Santander Consumer.`;
}

export default ViewModel;
