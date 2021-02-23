import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';
import getConfig from 'next/config';
const {
  publicRuntimeConfig: { NODE_ENV },
} = getConfig();
export class HeaderAnalyticsHandler extends BaseAnalyticsHandler {
  trackHeaderLogoClicked(): void {
    const event = 'Top Nav Link Click';
    const category = 'Top Nav';
    const properties = {
      action: event,
      category,
      label: 'Logo',
      version: 'New',
    };
    if (NODE_ENV === 'storybook') {
      console.log(
        `Track Analytics --->
        Event: ${event}
        Properties ${JSON.stringify(properties, null, 2)}`
      );
    }
    this.track(event, properties);
  }
}

export const headerAnalyticsHandler = new HeaderAnalyticsHandler();
