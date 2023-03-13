import { ABSmartlyContextValue } from '@vroom-web/analytics-integration/dist/absmartly/types';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

class PendingPriceViewModel {
  private analyticsHandler: AnalyticsHandler;

  readonly sitTight: string = 'sit tight';
  readonly findCar: string = 'find your next car';
  readonly takingALook: string =
    'Our buying specialists are taking a closer look and will send your price by email in one business day.';
  readonly spamFolder: string = 'Please be sure to check your spam folder.';
  readonly noPriceTitle: string = 'oops, looks like our system took a timeout';
  readonly noPriceDesc: string =
    'Not to worry, our buying specialists are taking the time to personally price your car.';
  readonly noPriceThingsToKnow: string = 'In the meantime, things to know:';
  readonly noPricelistItems: string[] = [
    'Our team will email you a price for your car shortly.',
    'If you do not see our offer in your inbox later, please check your spam folder.',
  ];

  constructor(private absmartly: ABSmartlyContextValue) {
    this.analyticsHandler = new AnalyticsHandler();
  }

  onPageLoad = (): void => {
    this.analyticsHandler.trackNoPrice();
  };

  handleFindCar(): void {
    const url = `/cars`;
    window.location.href = url;
  }

  get getAnalyticsHandler(): AnalyticsHandler {
    return this.analyticsHandler;
  }

  isNoPriceExp = (): boolean => {
    return this.absmartly.isInExperiment('ac-no-price-page');
  };
}

export default PendingPriceViewModel;
