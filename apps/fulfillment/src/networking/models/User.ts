// adapted from gearbox/clients/accmng/accmng_model.go type MyAccount struct
export interface User {
  accountId: number;
  firstName: string;
  lastName: string;
  emails: {
    personal: {
      email: string;
    };
  };
  company: string;
  status: Status;
}

export enum Status {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}
