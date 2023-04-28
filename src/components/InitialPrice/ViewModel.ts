import { ABSmartlyContextValue } from '@vroom-web/analytics-integration/dist/absmartly/types';
import { isErrorResponse } from '@vroom-web/networking';
import { makeAutoObservable, runInAction } from 'mobx';

import { displayCurrency, parseDate, parsedDateTime } from './Utils';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { PriceStore } from 'src/modules/price/store';
import client from 'src/networking/client';

class InitialPriceViewModel {
  private analyticsHandler: AnalyticsHandler;

  readonly price: string = '';
  readonly priceId: string = '';
  readonly goodUntil: string = '';
  readonly goodUntilMonthDay: string = '';
  readonly userEmail: string = '';
  readonly star: string = String.fromCharCode(42);

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
