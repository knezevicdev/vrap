import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';

class SantanderAnalyticsHandler extends BaseAnalyticsHandler {
  trackVroomSupport = (): void => {
    console.log('trackVroomSupport');
    const event = 'Call Vroom Support Clicked';
    const properties = {
      category: 'Contact Us',
    };
    this.track(event, properties);
  };

  trackSantanderSupport = (): void => {
    const event = 'Call Santander Support Clicked';
    const properties = {
      category: 'Contact Us',
    };
    this.track(event, properties);
  };

  trackOtherSupport = (): void => {
    const event = 'Other Support Contact Options Clicked';
    const properties = {
      category: 'Contact Us',
    };
    this.track(event, properties);
  };
}

export default SantanderAnalyticsHandler;
