import { isErrorResponse } from '@vroom-web/networking';

import {
  declineDeal,
  getInProgressDeal,
  UpdateDeal,
} from '../../networking/request';
import { SellFormTitleText, TradeInError } from './AppraisalForm.language';
import { validateZipCode } from './components/validation';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import {
  getMilageCheck,
  getUser,
  isUserSignedIn,
} from 'src/networking/request';
import Store from 'src/store';
import { ABSmartStore } from 'src/store/abSmartStore';
import { AppraisalStore } from 'src/store/appraisalStore';

class PriceViewModel {
  private _analyticsHandler: AnalyticsHandler = new AnalyticsHandler();
  appraisalStore: AppraisalStore;
  absmartly: ABSmartStore;

  constructor(public store: Store) {
    this.appraisalStore = store.appraisal;
    this.absmartly = store.absmart;
  }

  get isTradeIn(): boolean {
    return this.store.appraisal.isTradeIn;
  }

  get titleText(): string {
    return this.isTradeIn ? '' : SellFormTitleText;
  }

  get getAnalyticHandler(): AnalyticsHandler {
    return this._analyticsHandler;
  }

  get carfaxOdoLast(): any {
    return this.appraisalStore.carfaxOdoLast;
  }

  get showExactMileageDialog(): boolean {
    return this.appraisalStore.showExactMileageDialog;
  }

  validateZipCode(
    isTradeIn: boolean,
    zipCode: string,
    restrictedZipCodes: { zipCode: string }[],
    restrictedStates: {
      state: string;
      zipCodeMin: number;
      zipCodeMax: number;
    }[]
  ): boolean {
    return validateZipCode(
      isTradeIn,
      zipCode,
      restrictedZipCodes,
      restrictedStates
    );
  }

  updateAppraisal(formInfo: any): void {
    this.appraisalStore.updateAppraisal(formInfo);
  }

  clearAppraisal(): void {
    this.appraisalStore.clearAppraisal();
  }

  updateGeneralFields(fields: any): void {
    this.appraisalStore.updateGeneralFields(fields);
  }

  trackProcessStart = (): void => {
    this._analyticsHandler.trackProcessStart(this.appraisalStore.eventCategory);
  };

  trackStepComplete = (activeSection: number, formInfo: any): void => {
    this._analyticsHandler.trackStepComplete(
      activeSection,
      formInfo,
      this.appraisalStore.eventCategory
    );
  };

  trackNextStepViewed = (nextStep: number): void => {
    this._analyticsHandler.trackNextStepViewed(nextStep);
  };

  trackInvalidStateShown = (vin: string): void => {
    this._analyticsHandler.trackInvalidStateShown(
      vin,
      this.appraisalStore.eventCategory
    );
  };

  trackInvalidMakeShown = (vin: string): void => {
    this._analyticsHandler.trackInvalidMakeShown(
      vin,
      this.appraisalStore.eventCategory
    );
  };

  trackSellOrTradeIn = (vin: string, sellOrTradeIn: string): void => {
    this._analyticsHandler.trackSellOrTradeIn(
      vin,
      this.appraisalStore.eventCategory,
      sellOrTradeIn
    );
  };

  setMileageDialogDismiss = (): void => {
    this.appraisalStore.dismissExactMileageDialog();
  };

  async handleCarfaxCall(vin: string): Promise<any> {
    try {
      const response: any = await getMilageCheck(vin);
      if (isErrorResponse(response)) throw response;

      this.appraisalStore.setCarfaxOdoLast(response.mileage);

      return response;
    } catch (e) {
      console.log('error in carfax');
    }
  }

  isEmailCaptureExperiment = (): boolean => {
    return this.store.absmart.isInExperiment('ac-email-capture');
  };

  isNewFormExperimentActive = (): boolean => {
    return true;
  };

  isCTAColorExp = (): boolean => {
    return this.store.absmart.isInExperiment(
      'appraisal-form-all-cta-buttons-color'
    );
  };

  isSignIn = async (): Promise<void> => {
    const isLoggedIn = await isUserSignedIn();
    this.appraisalStore.setIsLoggedIn(isLoggedIn);
  };

  getUserSignIn = (): boolean => {
    return this.appraisalStore.isUserLoggedIn;
  };

  emailAnalytics = (
    eventName: string,
    loggedIn: boolean,
    mobile: number,
    nonInteraction: number,
    result: string | boolean
  ): void => {
    this._analyticsHandler.tracksEmailCapture(
      eventName,
      loggedIn,
      mobile,
      nonInteraction,
      result
    );
  };

  getAnonymousId = (): string => {
    return this._analyticsHandler.getAnonymousId();
  };

  getUser = async (): Promise<void> => {
    const user = await getUser();
    this.appraisalStore.setUser(user);
  };

  handleUpdateDeal(response: UpdateDeal): void {
    if (!response.isError) {
      window.location.href = response.redirect;
      return;
    }

    this.store.deal.setTradeInError(TradeInError);
  }

  cancelOffer = async (): Promise<void> => {
    this.store.deal.setTradeInError('');
    this.store.deal.setLoading(true);

    if (this.store.deal.deal) {
      const response = await declineDeal(this.store.deal.deal);
      this.handleUpdateDeal(response);
    } else {
      this.store.deal.setTradeInError(TradeInError);
    }

    this.store.deal.setLoading(false);
  };

  async initialize(): Promise<void> {
    try {
      const deal = await getInProgressDeal();
      this.store.deal.setDeal(deal);
    } catch (e) {
      console.log('Error while fetching deal');
    }
  }
}

export default PriceViewModel;
