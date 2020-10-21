import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';

class AnalyticsHandler extends BaseAnalyticsHandler {
  trackLogoClicked(): void {
    const event = 'Logo Clicked';
    const properties = {
      category: 'Main Navigation',
    };
    this.track(event, properties);
  }

  trackBuyClicked(): void {
    const event = 'Buy Clicked';
    const properties = {
      category: 'Main Navigation',
    };
    this.track(event, properties);
  }

  trackSellTradeClicked(): void {
    const event = 'Sell/Trade Clicked';
    const properties = {
      category: 'Main Navigation',
    };
    this.track(event, properties);
  }

  trackFinanceClicked(): void {
    const event = 'Finance Clicked';
    const properties = {
      category: 'Main Navigation',
    };
    this.track(event, properties);
  }

  trackLocationsClicked(): void {
    const event = 'Locations Clicked';
    const properties = {
      category: 'Main Navigation',
    };
    this.track(event, properties);
  }

  trackContactUsClicked(): void {
    const event = 'Contact Us Clicked';
    const properties = {
      category: 'Main Navigation',
    };
    this.track(event, properties);
  }
}

export default AnalyticsHandler;
