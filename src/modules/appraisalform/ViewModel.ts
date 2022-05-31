import { isErrorResponse } from '@vroom-web/networking';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { getMilageCheck, getUser, IsUserSignIn } from 'src/networking/request';
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

  get getAnalyticHandler(): AnalyticsHandler {
    return this._analyticsHandler;
  }

  get carfaxOdoLast(): any {
    return this.appraisalStore.carfaxOdoLast;
  }

  get isDetailedConditionsExperiment(): boolean {
    return this.absmartly.isInExperiment(
      'appraisal-detailed-condition-questions'
    );
  }

  get showExactMileageDialog(): boolean {
    return this.appraisalStore.showExactMileageDialog;
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
    const isLoggedIn = await IsUserSignIn();
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
}

export default PriceViewModel;
