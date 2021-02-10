import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { VERSION },
} = getConfig();
class FooterAnalyticsHandler extends BaseAnalyticsHandler {
  trackFooterLinks(eventName: string): void {
    try {
      const properties = {
        action: 'Clicked CTA',
        category: 'Tool Footer',
        version: 'New',
        applicationVersion: VERSION,
      };
      this.track(eventName, properties);
    } catch (err) {
      console.log('Analytic Event', err);
    }
  }
}

export default FooterAnalyticsHandler;
