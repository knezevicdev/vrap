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
  vehicleInfoForm: VehicleInfoForm = {
    vin: '',
    exteriorColor: '',
    keysAmount: '',
    make: '',
    mileage: 123,
    model: '',
    trim: '',
    vehicleOptions: [],
    year: 2000,
  };
  vehicleHistoryForm: VehicleHistoryForm = {
    hasAccident: '',
    titleStatus: '',
  };
  personalInfoForm: PersonalInfoForm = {
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    zipCode: '',
  };
  mechConditionForm: MechConditionForm = {
    additionalDetails: '',
    floodFireDamage: '',
    mechanicalCondition: '',
    otherWarning: '',
    runnable: '',
    warningLights: '',
    warningLightsValues: [],
  };
  intConditionForm: IntConditionForm = {
    interiorCondition: '',
    seats: '',
    smokedIn: '',
  };
  extConditionForm: ExtConditionForm = {
    afterMarket: [],
    dents: '',
    exteriorCondition: '',
    hailDamage: '',
    otherAfterMarket: '',
    paintChipping: '',
    rust: '',
    scratches: '',
    scratchesPanels: null,
    tiresAndWheels: '',
  };
  brand = 'vroom';
  dealership = 'vroom';
  form = 'sell';

  showSpinner = true;
  vehicles: any = [];
  vehicle: any = {};
  vehicleError?: any;
  checkoutTrade: any = {
    vehicles: [],
    vehicle: {},
    error: null,
  };
  showLicenseError = false;

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

  setShowSpinner(value: boolean): void {
    this.showSpinner = value;
  }

  setVehicles(value: any): void {
    this.vehicles = value;
  }

  setVehicle(value: any): void {
    this.vehicle = value;
  }

  setVehicleError(value: any): void {
    this.vehicleError = value;
  }

  setCheckoutTrade(key: string, value: any): void {
    this.checkoutTrade = {
      ...this.checkoutTrade,
      [key]: value,
    };
  }

  setLicenseError(value: boolean): void {
    this.showLicenseError = value;
  }
}
