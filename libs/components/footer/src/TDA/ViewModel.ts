import AnalyticsHandler from './integrations/AnalyticsHandler';

interface Link {
  href?: string;
  label: string;
  target?: string;
  rel?: string;
  handleAnalytics: () => void;
}

class ViewModel {
  private analyticsHandler = new AnalyticsHandler();

  readonly disclaimer = 'Copyright © 2020 Vroom.';
  readonly links: Link[] = [
    {
      label: 'Privacy Policy',
      href: 'https://www.vroom.com/legal/privacy-policy',
      target: '_blank',
      handleAnalytics: this.analyticsHandler.trackLinkClicked('Privacy Policy'),
    },
    {
      label: 'Terms of Use',
      href: 'https://www.vroom.com/legal/terms-of-use',
      target: '_blank',
      handleAnalytics: this.analyticsHandler.trackLinkClicked('Terms of Use'),
    },
  ];
}

export default ViewModel;
