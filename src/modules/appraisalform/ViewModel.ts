import { isErrorResponse } from '@vroom-web/networking';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { getMilageCheck } from 'src/networking/request';
import store from 'src/store';
import { ABSmartStore } from 'src/store/abSmartStore';
import { AppraisalStore } from 'src/store/appraisalStore';

class PriceViewModel {
  private _analyticsHandler: AnalyticsHandler = new AnalyticsHandler();
  appraisalStore: AppraisalStore;
  absmartly: ABSmartStore;

  constructor(public store: store) {
    this.appraisalStore = store.appraisal;
    this.absmartly = store.absmart;
  }

  get getAnalyticHandler(): AnalyticsHandler {
    return this._analyticsHandler;
  }

  get grade(): any {
    return this.appraisalStore.gradeCheck.grade;
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
}

export default PriceViewModel;
