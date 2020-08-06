import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';

class AnalyticsHandler extends BaseAnalyticsHandler {
  trackShopNow = (): void => {
    const event = 'Shop Now Clicked';
    const properties = {
      category: 'Main Navigation',
    };
    this.track(event, properties);
  };

  trackLogo = (): void => {
    const event = 'Home Clicked';
    const properties = {
      category: 'Main Navigation',
    };
    this.track(event, properties);
  };

  trackFinancialCalculator = (): void => {
    const event = 'Financial Calculators Clicked';
    const properties = {
      category: 'Main Navigation',
    };
    this.track(event, properties);
  };

  trackContact = (): void => {
    const event = 'Contact Us Clicked';
    const properties = {
      category: 'Main Navigation',
    };
    this.track(event, properties);
  };

  trackCorporateSite = (): void => {
    const event = 'Back to Corporate Site Clicked';
    const properties = {
      category: 'Main Navigation',
    };
    this.track(event, properties);
  };

  trackLearningOverview = (): void => {
    const event = 'Learning Center Overview Clicked';
    const properties = {
      category: 'Main Navigation',
      label: 'Learning Center',
    };
    this.track(event, properties);
  };

  trackLearningBlog = (): void => {
    const event = 'Learning Center Blog Clicked';
    const properties = {
      category: 'Main Navigation',
      label: 'Learning Center',
    };
    this.track(event, properties);
  };

  trackLearningEducation = (): void => {
    const event = 'Learning Center Financial Education Clicked';
    const properties = {
      category: 'Main Navigation',
      label: 'Learning Center',
    };
    this.track(event, properties);
  };

  trackLearningServicemembers = (): void => {
    const event = 'Learning Center Servicemembers Civil Relief Act Clicked';
    const properties = {
      category: 'Main Navigation',
      label: 'Learning Center',
    };
    this.track(event, properties);
  };
}

export default AnalyticsHandler;
