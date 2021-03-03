import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';
import getConfig from 'next/config';
const {
  publicRuntimeConfig: { VERSION },
} = getConfig();


class DealValidatorAnalyticsHandler extends BaseAnalyticsHandler {
  trackVehicleSoldModal(): void {
    const event = 'Transaction Blocked - Vehicle on Hold';
    try {
      const properties = {
        action: event,
        category: 'Checkout', 
        applicationVersion: VERSION
      };
      this.track(event, properties);
    } catch (err) {
      console.log('Analytic Event', err);
    }
  }
  trackPendingDealModal(): void {
    const event = 'Transaction Blocked - deal pending';
    try {
      const properties = {
        action: event,
        category: 'Checkout', 
        applicationVersion: VERSION
      };
      this.track(event, properties);
    } catch (err) {
      console.log('Analytic Event', err);
    }
  }
  trackDepositModal(): void {
    const event = 'Transaction Blocked - deposit submitted for another vehicle';
    try {
      const properties = {
        action: event,
        category: 'Checkout', 
        applicationVersion: VERSION
      };
      this.track(event, properties);
    } catch (err) {
      console.log('Analytic Event', err);
    }
  }
}

export default DealValidatorAnalyticsHandler;
