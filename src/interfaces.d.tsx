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
  data: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ID: string;
  };
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
  hailDamage: string;
  hasAccident: string;
  interiorCondition: string;
  keysAmount: string;
  lastName: string;
  lead_id: string;
  anonymous_id: string;
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
  csTrimId: number;
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

interface Carstory {
  alternatives: [];
  confidence: number;
  displayStyle: string;
  drivetrains: {
    name: string;
    price: number;
    selected: boolean;
  }[];
  engines: {
    name: string;
    price: number;
    selected: boolean;
  }[];
  features: {
    name: string;
    price: number;
    selected: boolean;
  }[];
  generation: number;
  id: string;
  isDecoded: boolean;
  make: string;
  model: string;
  modelId: number;
  powertrains: {
    drivetrain: string;
    engine: string;
    id: number;
    name: string;
    price: number;
    selected: boolean;
    transmission: string;
  }[];
  style: string;
  subGeneration: number;
  transmissions: {
    name: string;
    price: number;
    selected: boolean;
  }[];
  vehicleType: string;
  year: number;
}

export interface LicencePlateToVinResp {
  vehicleInfo: {
    bedStyle: string | null;
    bodyStyle: string;
    cabStyle: string | null;
    condition: string | null;
    conditionTimestamp: null;
    confidenceScore4: string;
    doors: 4;
    driveType: string;
    engine: string;
    engineDescription: string;
    engineDisplacement: string;
    exteriorColor: string | null;
    features: string[];
    fuel: string;
    generation: number | null;
    interiorColor: string | null;
    make: string;
    mileage: number;
    mileageTimestamp: number | null;
    model: string;
    mpg: number;
    mpgCity: number;
    mpgHighway: number;
    subGeneration: number;
    subModel: string | null;
    subTrim: string | null;
    transmission: string;
    transmissionDetails: string;
    trim: string;
    vin: string;
    wheelbase: string;
    year: number;
  };
  dataProviderInfo: Carstory | null;
}

export interface NewVinDecodeResp {
  vehicleInfo: {
    bedStyle: string | null;
    bodyStyle: string;
    cabStyle: null;
    condition: string;
    conditionTimestamp: number;
    confidenceScore4: string;
    doors: number;
    driveType: string;
    engine: string;
    engineDescription: string;
    engineDisplacement: string;
    exteriorColor: string;
    features: string[];
    fuel: string;
    generation: number;
    interiorColor: string;
    make: string;
    mileage: number;
    mileageTimestamp: number | null;
    model: string;
    mpg: number;
    mpgCity: number;
    mpgHighway: number;
    subGeneration: number;
    subModel: string | null;
    subTrim: string | null;
    transmission: string;
    transmissionDetails: string;
    trim: string;
    vin: string;
    wheelbase: string;
    year: number;
  };
  dataProviderInfo: Carstory | null;
}

export interface DisambiguationResp {
  vehicleInfo: {
    bodyStyle: string;
    doors: number;
    driveType: string;
    engine: string;
    engineDescription: string;
    engineDisplacement: string;
    features: {
      name: string;
      price: number;
      selected: boolean;
    }[];
    fuel: string;
    generation: number;
    make: string;
    mileage: number;
    model: string;
    subGeneration: number;
    transmission: string;
    trim: string;
    year: number;
  };
  dataProviderInfo: Carstory;
}

export interface MileageCheckResp {
  mileage: number;
  errorMessage: string | null;
}

export interface WebLeadsPayload {
  type: string;
  tradeIn: boolean;
  message: {
    form: string;
    brand: string;
    utm_campaign: string;
    utm_content: string;
    utm_medium: string;
    utm_source: string;
    utm_term: string;
    utm_keyword: string;
    utm_subsource: string;
    site: string;
    subsite?: string;
  };
  person: {
    consent: {
      type: string;
      granted: boolean;
    }[];
    state: string;
    city: string;
    firstName: string;
    lastName: string;
    phone: {
      type: null;
      number: string;
    }[];
    email: {
      type: null;
      address: string;
    }[];
    address: any[];
  };
  weblead: {
    webpage: string;
    dealership: string;
    subid: string;
    gclid: string;
    sessionid: string;
    userid: string;
  };
  correlationId: string;
}

export interface WebLeadUserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subsite?: string;
  correlationId: string;
}

export interface UTMParams {
  utm_campaign: string;
  utm_content: string;
  utm_medium: string;
  utm_source: string;
  utm_term: string;
  utm_keyword: string;
  utm_subsource: string;
}

export interface MiscParams {
  gclid: string;
  subid: string;
}
