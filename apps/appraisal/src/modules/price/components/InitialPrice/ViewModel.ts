import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { PriceStore } from 'src/modules/price/store';
import { submitPriceResponse } from 'src/modules/price/store';
import { PriceData } from 'src/networking/Networker';

const displayCurrency = (num: number): string => {
  return '$' + Math.round(num).toLocaleString();
};

const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];

// 2020-04-30T00:00:00Z => April 30th, 2020
const parsedDateTime = (dateTime: string): string => {
  const parsedDate = new Date(dateTime);

  const year = parsedDate.getUTCFullYear();
  const month = MONTHS[parsedDate.getUTCMonth()].label;
  const day = parsedDate.getUTCDate();

  return `${month} ${day}, ${year}`;
};

class InitialPriceViewModel {
  private analyticsHandler: AnalyticsHandler;

  readonly yourPrice: string = 'your price';
  readonly yourPriceCamel: string = 'Your Price:';
  readonly continuePrice: string = 'continue';
  readonly offerExpPreDate: string = 'This price expires on ';
  readonly offerExpPostDate: string = ' or upon hitting ';
  readonly miles: string = '250 miles';
  readonly price: string = '';
  readonly priceId: string = '';
  readonly goodUntil: string = '';
  readonly legalDocumentation: string =
    "This price is based on data from thousands of similar market transactions, as well as the information you provided. Vroom may modify or revoke this price if the information you provided is inaccurate or if there is a significant present or prospective change in the used vehicle market beyond Vroom's control. Other terms and restrictions apply.";

  constructor(initialPriceState: PriceStore) {
    this.price = displayCurrency(initialPriceState.price);
    this.priceId = initialPriceState.priceId;
    this.goodUntil = parsedDateTime(initialPriceState.goodUntil);
    this.analyticsHandler = new AnalyticsHandler();
    this.analyticsHandler.trackPriceViewed();
  }

  onContinueClick = (): void => {
    const priceData: PriceData = {
      priceId: this.priceId,
      accepted: true,
    };

    submitPriceResponse(priceData);
    this.analyticsHandler.trackContinueClick();
  };
}

export default InitialPriceViewModel;
