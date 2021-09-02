import { displayCurrency, parsedDateTime } from './Utils';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { PriceStore } from 'src/modules/price/store';

class InitialPriceViewModel {
  private analyticsHandler: AnalyticsHandler;

  readonly yourPrice: string = 'your price';
  readonly yourPriceCamel: string = 'Your Price:';
  readonly continuePrice: string = 'continue';
  readonly offerExpPreDate: string = 'This price expires on ';
  readonly offerExpPostDate: string = ' or upon driving an additional ';
  readonly miles: string = '250 miles';
  readonly the: string = 'The ';
  readonly titleName: string = 'vehicle title ';
  readonly yourName: string = 'must be in your name';
  readonly price: string = '';
  readonly priceId: string = '';
  readonly goodUntil: string = '';
  readonly legalDocumentation: string =
    "This price is based on data from thousands of similar market transactions, as well as the information you provided. Vroom may modify or revoke this price if the information you provided is inaccurate or if there is a significant present or prospective change in the used vehicle market beyond Vroom's control. Other terms and restrictions apply.";

  constructor(private store: PriceStore) {
    const price = store.price;
    this.price = displayCurrency(price.price);
    this.priceId = price.priceId;
    this.goodUntil = parsedDateTime(price.goodUntil);
    this.analyticsHandler = new AnalyticsHandler();
  }

  onContinueClick = async (): Promise<void> => {
    await this.store.submitPriceResponse();
    this.analyticsHandler.trackContinueClick();
    const url = `/sell/verification/owner/${this.priceId}`;
    window.location.href = url;
  };

  onPageLoad = (): void => {
    this.analyticsHandler.trackPriceAutomated();
  };
}

export default InitialPriceViewModel;
