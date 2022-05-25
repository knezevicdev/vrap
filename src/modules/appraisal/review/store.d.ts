export interface VehicleInfoForm {
  vin: string;
  exteriorColor: string;
  keysAmount: string;
  make: string;
  mileage: number | null;
  model: string;
  trim: string;
  vehicleOptions: string[];
  year: number | null;
}

export interface VehicleHistoryForm {
  hasAccident: string;
  titleStatus: string;
  lienType: string;
  bankName: string;
  whichStatePurchase: string;
}

export interface PersonalInfoForm {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  zipCode: string;
}

export interface MechConditionForm {
  additionalDetails: string;
  floodFireDamage: string;
  mechanicalCondition: string;
  otherWarning: string;
  runnable: string;
  warningLights: string;
  warningLightsValues: string[];
}

export interface IntConditionForm {
  interiorCondition: string;
  seats: string;
  smokedIn: string;
}

export interface ExtConditionForm {
  afterMarket: string[];
  dents: string;
  dentsPanels?: number;
  exteriorCondition: string;
  hailDamage: string;
  otherAfterMarket: string;
  paintChipping: string;
  paintChippingPanels?: number;
  rust: string;
  scratches: string;
  scratchesPanels: null;
  tiresAndWheels: string;
}
