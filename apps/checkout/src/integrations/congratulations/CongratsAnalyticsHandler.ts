/*eslint @typescript-eslint/camelcase: [error, {properties: "never"}]*/
import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';
import { FooterEventTrackerEnum } from '@vroom-web/temp-ui-alias-for-checkout';
import getConfig from 'next/config';

import CongratsViewModel from 'src/modules/congratulations/ViewModel';
export enum TrackContactModule {
  helpCenter = 'Help Center Clicked',
  contactUs = 'Contact Us Clicked',
  phone = 'Phone Clicked',
}

const {
  publicRuntimeConfig: { VERSION },
} = getConfig();
class CongratsAnalyticsHandler extends BaseAnalyticsHandler {
  viewModel: CongratsViewModel;

  constructor(viewModel: CongratsViewModel) {
    super();
    this.viewModel = viewModel;
  }

  trackCongratsViewed(): void {
    try {
      const { username, UUID, vin } = this.viewModel.analyticsData;

      const name = 'Congrats page visit';
      const properties = {
        pageName: 'Car Reserved',
        url: window.location.href,
        title: 'Congrats page visit',
        userId: username,
        UUID,
        applicationVersion: VERSION,
        vin,
      };
      this.page(name, 'Car Reserved', properties);
    } catch (err) {
      console.log('Analytic Event', err);
    }
  }

  trackScheduleTime(): void {
    try {
      const { username, UUID } = this.viewModel.analyticsData;

      const event = 'Schedule a Time Clicked';
      const properties = {
        category: 'Ecommerce',
        pageName: 'Congratulations',
        section: 'hero',
        userId: username,
        UUID,
        applicationVersion: VERSION,
      };
      this.track(event, properties);
    } catch (err) {
      console.log('Analytic Event', err);
    }
  }

  trackContactModule(eventName: TrackContactModule): void {
    try {
      const { username, UUID } = this.viewModel.analyticsData;

      const properties = {
        category: 'Ecommerce',
        pageName: 'Congratulations',
        section: 'contact module',
        userId: username,
        UUID,
        applicationVersion: VERSION,
      };
      this.track(eventName, properties);
    } catch (err) {
      console.log('Analytic Event', err);
    }
  }

  trackOrderCompleted(): void {
    try {
      const {
        username,
        UUID,
        vin,
        paymentMethod,
        step,
        orderId,
        productId,
        productName,
        hasTrade,
      } = this.viewModel.analyticsData;

      const event = 'Order Completed';

      const properties = {
        category: 'Ecommerce',
        pageName: 'Congratulations',
        userId: username,
        UUID,
        applicationVersion: VERSION,
        vin,
        paymentMethod,
        step,
        order_id: orderId,
        product_id: productId,
        product_name: productName,
        has_trade: hasTrade,
      };

      this.track(event, properties);
    } catch (err) {
      console.log('Analytic Event', err);
    }
  }

  trackFooterLinks(eventName: FooterEventTrackerEnum): void {
    try {
      const { username, UUID } = this.viewModel.analyticsData;

      const properties = {
        category: 'Ecommerce',
        pageName: 'Congratulations',
        section: 'footer',
        userId: username,
        UUID,
        applicationVersion: VERSION,
      };
      this.track(eventName, properties);
    } catch (err) {
      console.log('Analytic Event', err);
    }
  }
}

export default CongratsAnalyticsHandler;
