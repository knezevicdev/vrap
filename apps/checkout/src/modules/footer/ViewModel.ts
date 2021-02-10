import AnalyticsHandler from 'src/integrations/footer/FooterAnalyticsHandler';
export interface FooterData {
  id: string;
  text: string;
  href: string;
}
export default class FooterViewModel {
  analyticsHandler: AnalyticsHandler;

  constructor() {
    this.analyticsHandler = new AnalyticsHandler();
  }

  readonly copyRight: string = `©${new Date().getFullYear()} VROOM. ALL RIGHTS RESERVED.`;
  readonly links = [
    {
      id: 'privacy',
      text: 'Privacy',
      href: '/legal/privacy-policy',
    },
    {
      id: 'terms',
      text: 'Terms',
      href: '/legal/terms-of-use',
    },
    {
      id: 'contact',
      text: 'Contact',
      href: '/contact',
    },
  ] as FooterData[];

  trackLink = (eventName: string): void =>
    this.analyticsHandler.trackFooterLinks(eventName);
}
