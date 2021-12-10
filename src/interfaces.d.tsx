export interface MailingAddress {
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  zipcode: string;
}

export interface PaymentOverviewFormValues {
  paymentOption: string;
  routingNumber: string;
  bankAccountNumber: string;
  isPrimaryAddress: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipcode: string;
}

export interface PlaidTokenResp {
  getLinkToken: {
    LinkToken: string;
    Expiration: string;
    RequestId: string;
  };
}

export interface PlaidData {
  Account: {
    Id: string;
    Mask: string;
    Name: string;
    Subtype: string;
    Type: string;
  };
  Email: string;
  Institution: {
    Id: string;
    Name: string;
  };
  PublicToken: string;
  ReferenceId: string;
  Source: string;
}

export enum AsyncStatus {
  Idle,
  Fetching,
}

export enum StoreStatus {
  Initial,
  Error,
  Success,
}

export interface Store {
  asyncStatus: AsyncStatus;
  storeStatus: StoreStatus;
}

export interface Stepper {
  step: string;
  progress: string;
  next: string;
  title: string;
}

interface MutationInputAccount {
  Id: string;
  Name: string;
  Type: string;
  Subtype: string;
  Mask: string;
}

interface MutationInputInstitution {
  Id: string;
  Name: string;
}

export interface MutationInput {
  Account: MutationInputAccount;
  Institution: MutationInputInstitution;
  PublicToken: string;
  Source: string;
  ReferenceId: string;
  Email: string;
}

export interface VehicleArr {
  inputLicensePlate: string;
  make: string;
  modelYear: string;
  plateType: string;
  processingType: string;
  restrictedStateIndicator: string;
  stateOfRegistration: string;
  vin: string;
  vinPattern: string;
}

export interface LtoVResp {
  data: {
    vehicles: VehicleArr[];
  };
}

export interface LtoVPayload {
  licensePlate: string;
  state: string;
}

export interface VinDecodeResp {
  decodeVIN: {
    basicData: {
      database: string;
      make: string;
      model: string;
      source: string;
      year: number;
    };
    colorData: {
      colors: string[];
      source: string;
    };
    options: [];
    trimData: {
      database: string;
      source: string;
      trims: {
        Uid: number;
        description: string;
        doors: number;
        long_description: string;
        options: [];
        source: string;
      };
    };
  };
}

export interface GradeCheckResp {
  grade: boolean;
}

export interface AppraisalResp {
  resp: boolean;
}

export interface AppraisalPayload {
  DateSubmitted: string;
  additionalDetails: string;
  afterMarket: [];
  brand: string;
  dealership: string;
  email: string;
  exteriorColor: string;
  exteriorCondition: string;
  firstName: string;
  floodFireDamage: string;
  form: string;
  hailDamage: string;
  hasAccident: string;
  interiorCondition: string;
  keysAmount: string;
  lastName: string;
  lead_id: string;
  make: string;
  mechanicalCondition: string;
  mileage: number;
  model: string;
  options: [];
  otherAfterMarket: string;
  otherWarning: string;
  phoneNumber: string;
  runnable: string;
  seats: string;
  smokedIn: string;
  tiresAndWheels: string;
  titleStatus: string;
  trim: string;
  type: string;
  vin: string;
  warningLights: string;
  warningLightsValues: [];
  year: number;
  zipCode: string;
}

export interface GenericObject {
  [key: string]: any;
}

export interface FormField {
  onChange: (event: GenericObject) => void;
  value: any; // => this is an example of a real any type
  error?: boolean;
  errorMessage?: string;
  onBlur?: (event: GenericObject) => void;
  onKeyPress?: (event: GenericObject) => void;
  disabled?: boolean;
  type?: string;
  customOptions?: GenericObject[];
  defaultLabel?: string;
  options?: GenericObject[];
  label?: string;
  tooltipText?: string;
  lenderId?: string;
}
