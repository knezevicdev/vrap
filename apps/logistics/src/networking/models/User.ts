export interface User {
  carrier?: Carrier;
  created_on: string;
  first_name: string;
  last_name: string;
  phone: string;
  portal_roles: Role[];
  portal_user_id: number;
  status: Status;
  updated_on: string;
  username: string;
}

export interface Carrier {
  carrier_id: number;
  carrier: string;
  carrier_code: string;
}

export interface Role {
  portal_role_id: number;
  name: string;
}

export enum Status {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}
