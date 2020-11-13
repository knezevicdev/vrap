import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';

class AnalyticsHandler extends BaseAnalyticsHandler {
  trackPriceViewed(): void {
    const name = 'Price Page';
    const category = 'sell';
    this.page(name, category);
  }

  trackPriceAutomated(): void {
    const event = 'Automated Price';
    const category = 'sell';
    const properties = { category };
    this.track(event, properties);
  }

  trackNoPrice(): void {
    const event = 'No Price';
    const category = 'sell';
    const properties = { category };
    this.track(event, properties);
  }

  trackContinueClick(): void {
    const event = 'Appraisal Offer Accepted';
    const category = 'sell';
    const properties = { category };
    this.track(event, properties);
  }
}

// It probably makes more sense to export a single instance
// than to keep recreating instances all over the place.
// TODO: replace individual instances by importing this instance.
export const analyticsHandler = new AnalyticsHandler();

export default AnalyticsHandler;
