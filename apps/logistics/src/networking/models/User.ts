// adapted from gearbox/clients/accmng/accmng_model.go type MyAccount struct
export interface User {
  carrier_user_id: number;
  username: string;
  status: Status;
  first_name: string;
  last_name: string;
  phone: string;
  created_on: string;
  carrier_id: number;
  carrier: string;
  carrier_code: string;
  roles: Roles[];
}

export enum Status {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

export interface Roles {
  role_id: number;
  name: string;
}
