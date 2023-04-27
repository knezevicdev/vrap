import { ABSmartlyContextValue } from '@vroom-web/analytics-integration/dist/absmartly/types';
import { isErrorResponse } from '@vroom-web/networking';
import { makeAutoObservable, runInAction } from 'mobx';

import { displayCurrency, parseDate, parsedDateTime } from './Utils';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { PriceStore } from 'src/modules/price/store';
import client from 'src/networking/client';

class InitialPriceViewModel {
  private analyticsHandler: AnalyticsHandler;

  readonly yourPrice: string = 'your price';
  readonly yourPriceAB: string = 'Your price';
  readonly yourPriceCamel: string = 'Your Price:';
  readonly continuePrice: string = 'continue';
  readonly offerExpPreDate: string = 'This price expires on ';
  readonly offerExpPostDate: string = ' or upon driving an additional ';
  readonly miles: string = '250 miles, ';
  readonly the: string = 'The ';
  readonly titleName: string = 'vehicle title ';
  readonly yourName: string = 'must be in your name.';
  readonly price: string = '';
  readonly priceId: string = '';
  readonly goodUntil: string = '';
  readonly goodUntilMonthDay: string = '';
  readonly userEmail: string = '';
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
  readonly wicheverOccerFirst: string = 'whichever occurs first. ';

  acceptingPrice = false;

  constructor(
    store: PriceStore,
    analyticsHandler: AnalyticsHandler,
    private absmartly: ABSmartlyContextValue
  ) {
    const price = store.price;
    this.price = displayCurrency(price.price);
    this.userEmail = store.price.userEmail;
    this.priceId = price.priceId;
    this.goodUntil = parsedDateTime(price.goodUntil);
    this.goodUntilMonthDay = parseDate(price.goodUntil);
    this.analyticsHandler = analyticsHandler;

    makeAutoObservable(this);
  }

  get verificationUrl() {
    if (this.isVerificationRedesignTest) {
      return `/sell/verification?priceId=${this.priceId}`;
    }
    return `/sell/verification/owner/${this.priceId}`;
  }

  checkSignInStatus = async (): Promise<boolean> => {
    const signInStatusResp = await client.signInStatus();
    if (isErrorResponse(signInStatusResp)) throw signInStatusResp;
    return (
      signInStatusResp &&
      signInStatusResp.data &&
      signInStatusResp.data.status === 'active'
    );
  };

  get isVerificationRedesignTest(): boolean {
    return this.absmartly.isInExperiment('verification-form-redesign');
  }

  onContinueClick = async (): Promise<boolean> => {
    runInAction(() => {
      this.acceptingPrice = true;
    });
    this.analyticsHandler.trackContinueClick();

    const isSignedIn = await this.checkSignInStatus();

    if (isSignedIn) {
      window.location.href = this.verificationUrl;
    }
    runInAction(() => {
      this.acceptingPrice = false;
    });

    return isSignedIn;
  };

  onPageLoad = (): void => {
    this.analyticsHandler.trackPriceAutomated();
  };
}

export default InitialPriceViewModel;
