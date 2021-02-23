import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';
import getConfig from 'next/config';
const {
  publicRuntimeConfig: { NODE_ENV },
} = getConfig();
export class DealSummaryAnalyticsHandler extends BaseAnalyticsHandler {
  trackDealSummaryToolTipsLinkClicked(item: string): void {
    const event = 'Deal Summary Tooltip Click';
    const category = 'Ecommerce';
    const properties = {
      action: `${event} [${item}]`,
      category,
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

export const dealSummaryAnalyticsHandler = new DealSummaryAnalyticsHandler();
