import { isErrorResponse } from '@vroom-web/networking';

import {
  declineDeal,
  getInProgressDeal,
  UpdateDeal,
} from '../../networking/request';
import { SellFormTitleText, TradeInError } from './AppraisalForm.language';
import { getStateFromZip } from './components/validation';

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

  get titleText(): string {
    return this.store.appraisal.isTradeIn ? '' : SellFormTitleText;
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

  getStateFromZip(zipCode: string): string {
    return getStateFromZip(zipCode);
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
    this._analyticsHandler.trackProcessStart();
  };

  trackStepComplete = (activeSection: number, formInfo: any): void => {
    this._analyticsHandler.trackStepComplete(activeSection, formInfo);
  };

  trackNextStepViewed = (nextStep: number): void => {
    this._analyticsHandler.trackNextStepViewed(nextStep);
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
    if (!this.store.deal.deal) return;

    this.store.deal.setTradeInError('');
    this.store.deal.setLoading(true);
    const response = await declineDeal(this.store.deal.deal);
    this.store.deal.setLoading(false);
    this.handleUpdateDeal(response);
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
