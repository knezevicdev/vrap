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

  trackPlaidACHSelected(): void {
    const event = 'Plaid ACH Selected';
    const category = 'Verification';
    const properties = { category };
    this.track(event, properties);
  }

  trackManualACHSelected(): void {
    const event = 'Manual ACH Selected';
    const category = 'Verification';
    const properties = { category };
    this.track(event, properties);
  }

  trackCheckSelected(): void {
    const event = 'Check Selected';
    const category = 'Verification';
    const properties = { category };
    this.track(event, properties);
  }

  trackVerificationReviewViewed(): void {
    const name = 'Verification Review';
    const category = 'verification';
    this.page(name, category);
  }

  trackVerificationSubmitted(email: string, firstName: string): void {
    const event = 'Verification Submitted';
    const category = 'verification';
    const properties = { email, 'Account.FirstName': firstName, category };
    this.track(event, properties);
  }
}

export default AnalyticsHandler;
