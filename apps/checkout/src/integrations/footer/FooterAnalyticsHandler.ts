import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';
import getConfig from 'next/config';
const {
  publicRuntimeConfig: { NODE_ENV, VERSION },
} = getConfig();

class FooterAnalyticsHandler extends BaseAnalyticsHandler {
  trackFooterLinks(label: string): void {
    const event = 'Clicked CTA';
    try {
      const properties = {
        action: event,
        category: 'Tool Footer',
        version: 'New',
        applicationVersion: VERSION,
        label,
      };
      if (NODE_ENV === 'storybook') {
        console.log(
          `Track Analytics --->
          Event: ${event}
          Properties ${JSON.stringify(properties, null, 2)}`
        );
      }
      this.track(event, properties);
    } catch (err) {
      console.log('Analytic Event', err);
    }
  }
}

export default FooterAnalyticsHandler;
