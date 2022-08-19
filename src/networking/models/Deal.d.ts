export interface DealStatus {
  status: string;
  step: string;
  pastSteps: string[];
  supportNeeded: boolean;
  reason: string;
  errorDetail: string;
  plateWillBeTransferred: boolean;
  interestedInTrade: boolean;
  canBeCancelled: boolean;
  backendProductsStepDone: boolean;
  docUploadStepDone: boolean;
  contractingStepDone: boolean;
  fastShipping: boolean;
  awaitingContracting: boolean;
  licenseState: string;
  tradeInStepDone: boolean;
  dealReviewStepDone: boolean;
  opportunityStage: string;
}

export interface Account {
  userName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  externalUserId: string;
}

export interface FuelType {
  key: string;
  display: string;
}

export interface ExteriorColorGeneric {
  key: string;
  display: string;
}

export interface DriveType {
  key: string;
  display: string;
}

export interface Vehicle {
  vin: string;
  created: Date;
  updated: Date;
  year: number;
  makeSlug: string;
  make: string;
  modelSlug: string;
  model: string;
  trim: string;
  doors: number;
  fuelType: FuelType;
  transmission?: any;
  engine?: any;
  cylinders: number;
  grossWeight: number;
  bodyType?: any;
  truckType?: any;
  truckBedCode?: any;
  truckBedLength?: any;
  baseTowingCapacity?: any;
  maxTowingCapacity?: any;
  category?: any;
  interiorColor?: any;
  exteriorColorGeneric: ExteriorColorGeneric;
  exteriorColorExact?: any;
  fourWheelDrive?: any;
  driveType: DriveType;
  options?: any;
  wreckTestPass: boolean;
  lemonTestPass: boolean;
  groundClearance: number;
  height?: any;
  wheelbase: number;
  width: number;
  length: number;
  frontTrackWidth: number;
  rearTrackWidth: number;
  engineBoreInches: number;
  combinedMpg: number;
  highwayMpg: number;
  cityMpg: number;
  msrp?: any;
  seatingCapacityStandard: number;
  seatingCapacityMax: number;
  seatingCapacity: number;
  isElectric: boolean;
  engineBore: number;
}

export interface Status {
  key: string;
  display: string;
}

export interface Buyer {
  id: number;
  buyerID: string;
  firstName?: any;
  lastName?: any;
}

export interface Purchasing {
  buyer: Buyer;
  purchasePrice: string;
  purchasedFrom: string;
  purchaseDate: Date;
  origin: string;
  suggestedRetailPrice?: any;
  buyerExpectedReconCost?: any;
}

export interface Pricing {
  reservePrice?: any;
  startPrice?: any;
  listPrice: number;
  msrp: number;
  blueBookValue: number;
}

export interface Recon {
  id: number;
  zoneId: number;
  rqcPassed: boolean;
  fqcPassed: boolean;
  rqcTimestamp?: any;
  fqcTimestamp?: any;
}

export interface Zone {
  zoneId: number;
  latitude: number;
  longitude: number;
  location: string;
  name: string;
}

export interface Inventory {
  id: string;
  created: Date;
  updated: Date;
  vehicle: Vehicle;
  status: Status;
  miles: number;
  purchasing: Purchasing;
  pricing: Pricing;
  fyusionID?: any;
  images?: any;
  imageSets?: any;
  adventStockNumber: string;
  externalID: string;
  consignmentPartner?: any;
  hasStockPhotos: boolean;
  spincarSpinUrl: string;
  isListed: boolean;
  grade: string;
  titlingQAPassAt: Date;
  titleState?: any;
  isAvailableToSell: boolean;
  recon: Recon;
  zone: Zone;
  holdId: string;
  externalHoldId: string;
  purchaseDealer: string;
  saleDealer?: any;
  basicWarrantyMonths: number;
  basicWarrantyMiles: number;
  basicWarrantyExpirationDate: string;
  drivetrainWarrantyMonths: number;
  drivetrainWarrantyMiles: number;
  drivetrainWarrantyExpirationDate: string;
  inServiceDate: string;
  ownerCount: number;
  previousOwnerType: string;
  badges?: any;
  imageURLs?: any;
  leadPhotoURL: string;
  availableSoon: boolean;
  haveTitle: boolean;
}

export interface Errors {
  error?: any;
}

export interface DmvFees {
  errors: Errors;
  fees?: any;
  total: string;
}

export interface SalesTax {
  serviceSalesTax?: any;
}

export interface Fault {
  field: string;
  errorMsg: string;
}

export interface TaxFilingInfo {
  isHomeRuleCityOnSUTS: boolean;
  isUseTaxRemitted: boolean;
  stateSalesTaxAccountNumber: string;
  citySalesTaxAccountNumber?: any;
  jurisdictionName: string;
}

export interface TaxesAndFees {
  status: string;
  dmvFees: DmvFees;
  salesTax: SalesTax;
  infoErrors?: any;
  faultCode: string;
  faultString: string;
  faults: Fault[];
  taxFilingInfo: TaxFilingInfo;
}

export interface AmountDue {
  taxableAmount: number;
  cashDownPayment: number;
  inventoryTaxRate: number;
  inventoryTaxFee: number;
  salesTaxPercentage: number;
  salesTaxAmount: number;
  otherStateTaxes: number;
  totalTaxes: number;
  titleFee: number;
  duplicateTitleFee: number;
  titlingCompanyFee: number;
  licenseAndRegistrationFee: number;
  inspectionFee: number;
  totalStateFees: number;
  documentationFee: number;
  wheelsOnTheRoadTax: number;
  documentaryStampTax: number;
  electronicRegistrationFee: number;
  preDeliveryServiceCharge: number;
  countyTaxPercentage: number;
  countyTax: number;
  cityTaxPercentage: number;
  cityTaxAmount: number;
  cityTaxableAmount: number;
  districtTaxPercentage: number;
  districtTaxAmount: number;
  specialDistrictTaxPercentage: number;
  specialDistrictTaxAmount: number;
  totalTaxesAndFees: number;
  shippingFee?: any;
  subTotal: number;
  totalBalanceDue: number;
}

export interface RegistrationAddress {
  id: number;
  type: string;
  firstName: string;
  lastName: string;
  streetLine1: string;
  streetLine2: string;
  city: string;
  county: string;
  state: string;
  postCode: string;
}

export interface Summary {
  source: string;
  paymentType: string;
  opportunityType: string;
  dealStatus: DealStatus;
  account: Account;
  inventory: Inventory;
  taxesAndFees: TaxesAndFees;
  amountDue: AmountDue;
  atcID: string;
  externalRegService: string;
  registrationAddress: RegistrationAddress;
}

export interface DealTradePayload {
  appraisalId: string;
  email: string;
  expirationDate: string;
  make: string;
  mileage: number;
  model: string;
  offerId: number;
  offerPrice: number;
  offerStatus: string;
  vin: string;
  year: number;
}

export interface DealTrade {
  payload: DealTradePayload;
}

export interface Deal {
  deal_id: number;
  deal_trades?: Array<DealTrade>;
  account_id: number;
  vin: string;
  created: Date;
  updated: Date;
  summary: Summary;
  version_number: number;
}
