import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';

class AnalyticsHandler extends BaseAnalyticsHandler {
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

export default AnalyticsHandler;
