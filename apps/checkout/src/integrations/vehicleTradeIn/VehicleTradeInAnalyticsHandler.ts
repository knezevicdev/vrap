import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';
import getConfig from 'next/config';
const {
  publicRuntimeConfig: { VERSION },
} = getConfig();

class VehicleTradeInAnalyticsHandler extends BaseAnalyticsHandler {
  trackVinClick(): void {
    const event = 'Started Trade with New Appraisal with VIN';
    try {
      const properties = {
        action: event,
        category: 'Ecommerce',
        applicationVersion: VERSION,
      };
      this.track(event, properties);
    } catch (err) {
      console.log('Analytic Event', err);
    }
  }
  trackLicensePlateClick(): void {
    const event = 'Started Trade with New Appraisal with License Plate';
    try {
      const properties = {
        action: event,
        category: 'Ecommerce',
        applicationVersion: VERSION,
      };
      this.track(event, properties);
    } catch (err) {
      console.log('Analytic Event', err);
    }
  }
}

export default VehicleTradeInAnalyticsHandler;
