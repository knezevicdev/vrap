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
  data: {
    getLinkToken: {
      LinkToken: string;
      Expiration: string;
      RequestId: string;
    };
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

export interface AsyncStore {
  isRequesting: boolean;
}
