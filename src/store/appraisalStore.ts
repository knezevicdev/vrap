import { makeAutoObservable } from 'mobx';

import {
  ExtConditionForm,
  IntConditionForm,
  MechConditionForm,
  PersonalInfoForm,
  VehicleHistoryForm,
  VehicleInfoForm,
} from 'src/modules/appraisal/review/store';

export class AppraisalStore {
  vehicleInfoForm: VehicleInfoForm = {};
  vehicleHistoryForm: VehicleHistoryForm = {};
  personalInfoForm: PersonalInfoForm = {};
  mechConditionForm: MechConditionForm = {};
  intConditionForm: IntConditionForm = {};
  extConditionForm: ExtConditionForm = {};
  brand = 'vroom';
  dealership = 'vroom';
  form = 'sell';
  constructor() {
    makeAutoObservable(this);
  }

  init(): boolean {
    const appraisal = localStorage.getItem('appraisal');

    if (appraisal !== null) {
      const appraisalData = JSON.parse(appraisal);
      this.vehicleInfoForm = appraisalData.vehicleInfoForm;
      this.vehicleHistoryForm = appraisalData.vehicleHistoryForm;
      this.personalInfoForm = appraisalData.personalInfoForm;
      this.mechConditionForm = appraisalData.mechConditionForm;
      this.intConditionForm = appraisalData.intConditionForm;
      this.extConditionForm = appraisalData.extConditionForm;
      return true;
    } else {
      return false;
    }
  }
}
