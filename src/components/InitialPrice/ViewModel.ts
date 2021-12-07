import { displayCurrency, parseDate, parsedDateTime } from './Utils';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { PriceStore } from 'src/modules/price/store';
import Store from 'src/store';

class InitialPriceViewModel {
  private analyticsHandler: AnalyticsHandler;

  readonly yourPrice: string = 'your price';
  readonly yourPriceAB: string = 'Your price';
  readonly yourPriceCamel: string = 'Your Price:';
  readonly continuePrice: string = 'continue';
  readonly offerExpPreDate: string = 'This price expires on ';
  readonly offerExpPostDate: string = ' or upon driving an additional ';
  readonly miles: string = '250 miles.';
  readonly the: string = 'The ';
  readonly titleName: string = 'vehicle title ';
  readonly yourName: string = 'must be in your name.';
  readonly price: string = '';
  readonly priceId: string = '';
  readonly goodUntil: string = '';
  readonly goodUntilMonthDay: string = '';
  readonly star: string = String.fromCharCode(42);
  readonly legalDocumentation: string =
    "This price is based on data from thousands of similar market transactions, as well as the information you provided. Vroom may modify or revoke this price if the information you provided is inaccurate or if there is a significant present or prospective change in the used vehicle market beyond Vroom's control. Other terms and restrictions apply.";
  readonly whatYoullNeed: string = "What you'll need:";
  readonly whatYouNeedOptions: string[] = [
    'Vehicle title in your name (if applicable)',
    "Your driver's license",
    'Vehicle registration',
    'Photo of your odometer',
  ];

  constructor(
    private store: PriceStore,
    analyticsHandler: AnalyticsHandler,
    private appStore: Store
  ) {
    const price = store.price;
    this.price = displayCurrency(price.price);
    this.priceId = price.priceId;
    this.goodUntil = parsedDateTime(price.goodUntil);
    this.goodUntilMonthDay = parseDate(price.goodUntil);
    this.analyticsHandler = analyticsHandler;
  }

  onContinueClick = async (): Promise<void> => {
    await this.store.submitPriceAccept();
    this.analyticsHandler.trackContinueClick();
    const isAccountCreateAbTest = this.appStore.absmart.isInExperiment(
      'ac-account-create'
    );
    const url = isAccountCreateAbTest
      ? `/myaccount/create/suyc?redirect=https://www.vroom.com/sell/verification/owner/${this.priceId}`
      : `/sell/verification/owner/${this.priceId}`;
    window.location.href = url;
  };

  onPageLoad = (): void => {
    this.analyticsHandler.trackPriceAutomated();
  };
}

export default InitialPriceViewModel;
