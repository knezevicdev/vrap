import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';

class AnalyticsHandler extends BaseAnalyticsHandler {
  trackPriceViewed(): void {
    const name = 'Price Page';
    const category = 'sell';
    this.page(name, category);
  }

  trackCongratsViewed(): void {
    const name = 'Congratulations Page';
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

  trackPaymentOptionsViewed(): void {
    const name = 'Payment Method';
    const category = 'Verification';
    this.page(name, category);
  }

  trackPaymentOptionsSubmitted(selection: string): void {
    const event = 'Payment Method Submitted';
    const category = 'Verification';
    const label = selection;
    const properties = { category, label };
    this.track(event, properties);
  }
}

// It probably makes more sense to export a single instance
// than to keep recreating instances all over the place.
// TODO: replace individual instances by importing this instance.
export const analyticsHandler = new AnalyticsHandler();

export default AnalyticsHandler;
