import AnalyticsHandler from './integrations/AnalyticsHandler';

interface Link {
  linkToVroom: boolean;
  href?: string;
  label: string;
  target?: string;
  rel?: string;
  handleAnalytics: () => void;
}

class ViewModel {
  constructor(vroomUrl?: string) {
    if (vroomUrl) {
      this.links.forEach((link) => {
        if (link.linkToVroom)
          link.href = `${vroomUrl}${link.href}${this.TDAQueryString}`;
      });
    }
  }
  readonly TDAQueryString: string =
    '?vit_source=texasdirectauto&vit_medium=wl&vit_dest=vroom&vit_brand=TDA';
  private analyticsHandler = new AnalyticsHandler();

  readonly links: Link[] = [
    {
      linkToVroom: true,
      label: 'Privacy Policy',
      href: '/legal/privacy-policy',
      target: '_blank',
      handleAnalytics: this.analyticsHandler.trackLinkClicked('Privacy Policy'),
    },
    {
      linkToVroom: true,
      label: 'Terms of Use',
      href: '/legal/terms-of-use',
      target: '_blank',
      handleAnalytics: this.analyticsHandler.trackLinkClicked('Terms of Use'),
    },
    {
      linkToVroom: false,
      label: 'Do Not Sell My Info (CA Residents)',
      href: `https://privacyportal.onetrust.com/webform/8086730d-99f7-48ea-b3a1-0b3bb0cf163e/aa3e2126-7439-411d-a9a2-9fa0c4f8b01d`,
      target: '_blank',
      handleAnalytics: this.analyticsHandler.trackLinkClicked(
        'Do Not Sell My Info (CA Residents)'
      ),
    },
  ];

  readonly disclaimer = 'Copyright © 2020 Vroom.';
}

export default ViewModel;
