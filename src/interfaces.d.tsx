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
