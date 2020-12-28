import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';

import packageJson from 'src/../package.json';
import CongratsViewModel from 'src/modules/congratulations/ViewModel';

class CongratsAnalyticsHandler extends BaseAnalyticsHandler {
  viewModel: CongratsViewModel;

  constructor(viewModel: CongratsViewModel) {
    super();
    this.viewModel = viewModel;
  }

  trackCongratsViewed(userId: string, UUID: string): void {
    const name = 'Congrats page visit';
    const properties = {
      pageName: 'Car Reserved',
      url: window.location.href,
      title: 'Congrats page visit',
      version: 'New',
      userId,
      UUID,
      applicationVersion: packageJson.version,
      vin: '',
    };
    //TODO: Fix page event to allow properties on analytics integration
    //this.page(name, properties);
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
        applicationVersion: packageJson.version,
      };
      this.track(event, properties); 
    } catch (err) {
      console.log('Analytic Event', err);
    }
  }
}

//export const analyticsHandler = new CongratsAnalyticsHandler();

export default CongratsAnalyticsHandler;
