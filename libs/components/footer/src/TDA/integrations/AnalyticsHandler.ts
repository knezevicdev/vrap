import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';

class AnalyticsHandler extends BaseAnalyticsHandler {
  private getPageName = (): string => {
    const page = window.location.pathname;
    switch (page) {
      case 'cars': {
        return 'Catalog';
      }
      case 'vehicle': {
        return 'Product';
      }
      case 'contact': {
        return 'Contact Us';
      }
      default:
        return 'Home';
    }
  };

  trackLinkClicked = (label: string) => (): void => {
    const event = 'Footer Clicked';
    const properties = {
      category: this.getPageName(),
      label: label,
    };
    this.track(event, properties);
  };
}

export default AnalyticsHandler;
