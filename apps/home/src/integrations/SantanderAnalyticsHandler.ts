import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';

class SantanderAnalyticsHandler extends BaseAnalyticsHandler {
  trackBrowseAll = (): void => {
    const event = 'Browse All Clicked';
    const properties = {
      category: 'Home',
    };
    this.track(event, properties);
  };

  trackShopNow = (): void => {
    const event = 'Shop Now Clicked';
    const properties = {
      category: 'Home',
    };
    this.track(event, properties);
  };

  trackProductSearched(
    label: 'Autocomplete' | 'Free Form',
    query: string
  ): void {
    const event = 'Product Searched';
    const properties = {
      category: 'Home',
      label,
      query,
    };
    this.track(event, properties);
  }
}

export default SantanderAnalyticsHandler;
