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
  vehicleId = '';
  vehicleDecodeData: any;
  gradeCheck: any;
  vehicleInfoForm: VehicleInfoForm = {
    vin: '',
    exteriorColor: '',
    keysAmount: '',
    make: '',
    mileage: null,
    zipCode: '',
    model: '',
    trim: '',
    vehicleOptions: [],
    year: null,
  };
  vehicleHistoryForm: VehicleHistoryForm = {
    hasAccident: '',
    titleStatus: '',
    lienType: '',
    bankName: '',
    whichStatePurchase: '',
  };
  personalInfoForm: PersonalInfoForm = {
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
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
    paintChippingPanels: 0,
    dentsPanels: 0,
    tiresAndWheels: '',
  };
  brand = 'Vroom';
  dealership = 'Vroom';
  type = 'Website';
  form = 'sell';
  isEmpty = true;
  showExactMileageDialog = true;
  carfaxOdoLast: any = null;

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
  showReviewError = false;
  isUserLoggedIn = false;
  user: any = {};

  constructor() {
    makeAutoObservable(this);
  }

  isFormEmpty(): boolean {
    return this.isEmpty;
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

  setVehicleId(vehicleId: string): void {
    this.vehicleId = vehicleId;
  }

  setShowReviewError(value: boolean): void {
    this.showReviewError = value;
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

  setVehicleData(data: any): void {
    this.vehicleDecodeData = {
      ...this.vehicleDecodeData,
      ...data,
    };

    this.vehicleInfoForm = {
      ...this.vehicleInfoForm,
      year: data.year,
      model: data.model,
      make: data.make,
      zipCode: data.zipCode,
    };
  }

  setVehicleFeatureData(data: any): void {
    this.vehicleDecodeData = {
      ...this.vehicleDecodeData,
      ...data,
    };
  }

  setGradeCheck(data: any): void {
    this.gradeCheck = { ...data };
  }

  dismissExactMileageDialog(): void {
    this.showExactMileageDialog = false;
  }

  updateAppraisal(formInfo: any): void {
    this.vehicleInfoForm = {
      ...this.vehicleInfoForm,
      ...formInfo.vehicleInfoForm,
    };
    this.vehicleHistoryForm = { ...formInfo.vehicleHistoryForm };
    this.intConditionForm = { ...formInfo.intConditionForm };
    this.extConditionForm = { ...formInfo.extConditionForm };
    this.mechConditionForm = { ...formInfo.mechConditionForm };
    this.personalInfoForm = { ...formInfo.personalInfoForm };
    this.isEmpty = false;
  }

  clearAppraisal(): void {
    this.vehicleInfoForm = {
      vin: '',
      exteriorColor: '',
      keysAmount: '',
      make: '',
      mileage: null,
      model: '',
      trim: '',
      vehicleOptions: [],
      year: null,
      zipCode: '',
    };
    this.vehicleHistoryForm = {
      hasAccident: '',
      titleStatus: '',
      lienType: '',
      bankName: '',
      whichStatePurchase: '',
    };
    this.personalInfoForm = {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
    };
    this.mechConditionForm = {
      additionalDetails: '',
      floodFireDamage: '',
      mechanicalCondition: '',
      otherWarning: '',
      runnable: '',
      warningLights: '',
      warningLightsValues: [],
    };
    this.intConditionForm = {
      interiorCondition: '',
      seats: '',
      smokedIn: '',
    };
    this.extConditionForm = {
      afterMarket: [],
      dents: '',
      exteriorCondition: '',
      hailDamage: '',
      otherAfterMarket: '',
      paintChipping: '',
      rust: '',
      scratches: '',
      scratchesPanels: null,
      dentsPanels: 0,
      paintChippingPanels: 0,
      tiresAndWheels: '',
    };
    this.isEmpty = true;
  }

  updateGeneralFields(fields: any): void {
    this.brand = fields.brand.length ? fields.brand : this.brand;
    this.dealership = fields.dealership.length
      ? fields.dealership
      : this.dealership;
    this.type = fields.type.length ? fields.type : this.type;
  }

  setCarfaxOdoLast(mileage: any): void {
    this.carfaxOdoLast = mileage;
  }

  setIsLoggedIn(status: boolean): void {
    this.isUserLoggedIn = status;
  }

  setUser(user: any): void {
    this.user = user;
  }
}
