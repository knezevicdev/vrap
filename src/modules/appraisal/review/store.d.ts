export interface VehicleInfoForm {
  vin: string;
  exteriorColor: string;
  keysAmount: string;
  make: string;
  mileage: number | null;
  model: string;
  trim: string;
  zipCode: string;
  vehicleOptions: string[];
  year: number | null;
  csTrimId?: number;
  sellOrTradeIn: string;
}

export interface VehicleHistoryForm {
  hasAccident: string;
  repairedAfterAccident: string;
  titleStatus: string;
  lienType: string;
  bankName: string;
  state: string;
}

export interface PersonalInfoForm {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface MechConditionForm {
  additionalDetails: string;
  floodFireDamage: string;
  mechanicalCondition: string;
  otherWarning: string;
  runnable: string;
  warningLights: string;
  warningLightsValues: string[];
  transmissionIssue: string;
  engineIssue: string;
  noMechanicalIssues: string;
}

export interface IntConditionForm {
  interiorCondition: string;
  seats: string;
  smokedIn: string;
  ripsOrTearsInSeats: string;
  damagedElectronic: string;
  damagedDashboardOrPanels: string;
  noInteriorDamage: string;
  majorDamageInterior: string;
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
  floodDamage: string;
  fireDamage: string;
  wornTires: string;
  noExteriorDamage: string;
  majorDamageExterior: string;
  panelsWithMajorDamage: number;
  frameOrStructuralDamage: string;
  passStateEmissionStandards: string;
  windshieldCrackedChipped: string;
}
