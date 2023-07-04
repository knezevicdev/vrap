import { create } from 'zustand';

import {
  ExtConditionForm,
  IntConditionForm,
  MechConditionForm,
  PersonalInfoForm,
  VehicleHistoryForm,
  VehicleInfoForm,
} from 'src/modules/appraisal/review/store';

export type AppraisalState = {
  vehicleId: string;
  vehicleDecodeData: any;
  gradeCheck: any;
  vehicleInfoForm: VehicleInfoForm;
  vehicleHistoryForm: VehicleHistoryForm;
  personalInfoForm: PersonalInfoForm;
  mechConditionForm: MechConditionForm;
  intConditionForm: IntConditionForm;
  extConditionForm: ExtConditionForm;
  brand: string;
  dealership: string;
  type: string;
  form: string;
  isEmpty: boolean;
  vehicle: any;
  reviewError: string | undefined;
  isUserLoggedIn: boolean;
  user: any;
  isTradeIn: boolean;
  appraisalPath(): string;
  reviewPath(): string;
  eventCategory(): string;
  isFormEmpty(): boolean;
  setForm(value: string): void;
  setVehicleId(vehicleId: string): void;
  setReviewError(message?: string): void;
  clearReviewError(): void;
  setVehicleData(data: any): void;
  setVehicleFeatureData(data: any): void;
  setGradeCheck(data: any): void;
  updateAppraisal(formInfo: any): void;
  clearAppraisal(): void;
  updateGeneralFields(fields: any): void;
  setIsLoggedIn(status: boolean): void;
  setUser(user: any): void;
  setIsTradeIn(value: boolean): void;
};

const useAppraisalStore = create<AppraisalState>((set, get) => ({
  vehicleId: '',
  vehicleDecodeData: {},
  gradeCheck: {},
  vehicleInfoForm: {
    vin: '',
    exteriorColor: '',
    keysAmount: '1',
    make: '',
    mileage: null,
    zipCode: '',
    model: '',
    trim: '',
    vehicleOptions: [],
    year: null,
    sellOrTradeIn: '',
  },
  vehicleHistoryForm: {
    hasAccident: '',
    repairedAfterAccident: '',
    titleStatus: '',
    lienType: '',
    bankName: '',
    state: '',
  },
  personalInfoForm: {
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  },
  mechConditionForm: {
    additionalDetails: '',
    floodFireDamage: '',
    mechanicalCondition: '',
    otherWarning: '',
    runnable: '',
    warningLights: '',
    warningLightsValues: [],
    transmissionIssue: '',
    engineIssue: '',
    noMechanicalIssues: '',
  },
  intConditionForm: {
    interiorCondition: '',
    seats: '',
    smokedIn: '',
    ripsOrTearsInSeats: '',
    damagedElectronic: '',
    damagedDashboardOrPanels: '',
    noInteriorDamage: '',
    majorDamageInterior: '',
  },
  extConditionForm: {
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
    tiresAndWheels: 'Under 5K',
    floodDamage: '',
    fireDamage: '',
    wornTires: '',
    noExteriorDamage: '',
    majorDamageExterior: '',
    panelsWithMajorDamage: 0,
    frameOrStructuralDamage: '',
    passStateEmissionStandards: '',
    windshieldCrackedChipped: '',
  },
  brand: 'Vroom',
  dealership: 'Vroom',
  type: 'Website',
  form: 'sell',
  isEmpty: true,
  vehicle: {},
  reviewError: undefined,
  isUserLoggedIn: false,
  user: {},
  isTradeIn: false,
  appraisalPath(): string {
    return get().isTradeIn
      ? '/sell/tradeIn-selfService'
      : '/sell/vehicleInformation';
  },
  reviewPath(): string {
    return get().isTradeIn
      ? '/sell/tradeIn-selfService-Review'
      : '/sell/review';
  },
  eventCategory(): string {
    return get().isTradeIn ? 'Trade' : 'Sell';
  },
  isFormEmpty(): boolean {
    return get().isEmpty;
  },
  setForm(value: string): void {
    set({ form: value });
  },
  setVehicleId(vehicleId: string): void {
    set({ vehicleId });
  },
  setReviewError(
    message = 'Oops! Something went wrong. Please try to submit again.'
  ): void {
    set({ reviewError: message });
  },
  clearReviewError(): void {
    set({ reviewError: undefined });
  },
  setVehicleData(data: any): void {
    const vehicleDecodeData = {
      ...get().vehicleDecodeData,
      ...data,
    };
    const vehicleInfoForm = {
      ...get().vehicleInfoForm,
      year: data.year,
      model: data.model,
      make: data.make,
      zipCode: data.zipCode,
    };
    set({ vehicleDecodeData, vehicleInfoForm });
  },
  setVehicleFeatureData(data: any): void {
    set({
      vehicleDecodeData: {
        ...get().vehicleDecodeData,
        ...data,
      },
    });
  },
  setGradeCheck(data: any): void {
    set({ gradeCheck: { ...data } });
  },
  updateAppraisal(formInfo: any) {
    set({
      vehicleInfoForm: {
        ...get().vehicleInfoForm,
        ...formInfo.vehicleInfoForm,
      },
      vehicleHistoryForm: {
        ...formInfo.vehicleHistoryForm,
      },
      personalInfoForm: {
        ...formInfo.personalInfoForm,
      },
      mechConditionForm: {
        ...formInfo.mechConditionForm,
      },
      intConditionForm: {
        ...formInfo.intConditionForm,
      },
      extConditionForm: {
        ...formInfo.extConditionForm,
      },
      isEmpty: false,
    });
  },
  clearAppraisal() {
    set({
      vehicleInfoForm: {
        vin: '',
        exteriorColor: '',
        keysAmount: '1',
        make: '',
        mileage: null,
        model: '',
        trim: '',
        vehicleOptions: [],
        year: null,
        zipCode: '',
        sellOrTradeIn: '',
      },
      vehicleHistoryForm: {
        hasAccident: '',
        repairedAfterAccident: '',
        titleStatus: '',
        lienType: '',
        bankName: '',
        state: '',
      },
      personalInfoForm: {
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
      },
      mechConditionForm: {
        additionalDetails: '',
        floodFireDamage: '',
        mechanicalCondition: '',
        otherWarning: '',
        runnable: '',
        warningLights: '',
        warningLightsValues: [],
        transmissionIssue: '',
        engineIssue: '',
        noMechanicalIssues: '',
      },
      intConditionForm: {
        interiorCondition: '',
        seats: '',
        smokedIn: '',
        ripsOrTearsInSeats: '',
        damagedElectronic: '',
        damagedDashboardOrPanels: '',
        noInteriorDamage: '',
        majorDamageInterior: '',
      },
      extConditionForm: {
        afterMarket: [],
        dents: '',
        majorDamageExterior: '',
        panelsWithMajorDamage: 0,
        exteriorCondition: '',
        hailDamage: '',
        otherAfterMarket: '',
        paintChipping: '',
        rust: '',
        scratches: '',
        scratchesPanels: null,
        dentsPanels: 0,
        paintChippingPanels: 0,
        tiresAndWheels: 'Under 5K',
        floodDamage: '',
        fireDamage: '',
        wornTires: '',
        noExteriorDamage: '',
        frameOrStructuralDamage: '',
        passStateEmissionStandards: '',
        windshieldCrackedChipped: '',
      },
      isEmpty: true,
    });
  },
  updateGeneralFields(fields: any) {
    const state = get();

    set({
      brand: fields.brand.length ? fields.brand : state.brand,
      dealership: fields.dealership.length
        ? fields.dealership
        : state.dealership,
      type: fields.type.length ? fields.type : state.type,
    });
  },
  setIsLoggedIn(status: boolean) {
    set({ isUserLoggedIn: status });
  },
  setUser(user: any) {
    set({ user });
  },
  setIsTradeIn(value: boolean) {
    set({ isTradeIn: value });
  },
}));

export default useAppraisalStore;
