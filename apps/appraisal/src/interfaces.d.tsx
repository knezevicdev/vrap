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
}

export interface PlaidTokenResp {
  data: {
    getLinkToken: {
      LinkToken: string;
      Expiration: string;
      RequestId: string;
    }
  };
}

export interface PlaidData {
  account: {
    id: string;
    mask: string;
    name: string;
    subtype: string;
    type: string;
  },
  authenticated_user: boolean;
  email: string;
  institution: {
    id: string;
    name: string;
  },
  public_token: string;
  reference_id: string;
  source: string;
}
