import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';

import packageJson from 'src/../package.json';

class AnalyticsHandler extends BaseAnalyticsHandler {
  trackScheduleTime(userId: string, UUID: string): void {
    const event = 'Schedule a Time Clicked';
    const properties = {
      category: 'Ecommerce',
      pageName: 'Congratulations',
      section: 'hero',
      userId,
      UUID,
      applicationVersion: packageJson.version,
    };
    this.track(event, properties);
  }
}

export const analyticsHandler = new AnalyticsHandler();

export default AnalyticsHandler;
