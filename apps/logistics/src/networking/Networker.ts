import axios, { AxiosResponse } from 'axios';

import { IdToken } from './models/Auth';
import { Shipment, ShipmentStatus } from './models/Shipments';
import { Carrier, User } from './models/User';

export enum Status {
  INITIAL = 'initial',
  FETCHING = 'fetching',
  SUCCESS = 'success',
  ERROR = 'error',
}

const axiosInstance = axios.create();

export const getUsers = async (
  carrierCode?: string
  // status?: string
): Promise<AxiosResponse<{ users: User[] }>> => {
  const url = '/api/gearbox';
  const data = {
    query: `query portalUsersQuery($carrier: String!) {
      portalUsers(carrier: $carrier) {
        __typename
        ... on PortalUsersArray {
          users {
            portal_user_id
            username
            status
            first_name
            middle_name
            last_name
            phone
            created_on
            updated_on
            carrier {
              carrier_id
              carrier
              carrier_code
            }
            portal_roles {
              portal_role_id
              name
            }
          }
        }
        ... on APIError {
          errorType
          errorTitle
          errorDetail
        }

      }
    }`,
    variables: { carrier: carrierCode ?? '' },
    queryKey: 'portalUsers',
  };

  return axiosInstance.post(url, data);
};

export const getCarriers = async (
  filter: string
): Promise<AxiosResponse<{ carriers: Carrier[] }>> => {
  const url = '/api/gearbox';
  const data = {
    query: `query carriersQuery($filter: String!) {
      carriers(filter: $filter) {
        __typename
        ... on CarriersArray {
          carriers {
            carrier_id
            carrier_code
            carrier
          }
        }
        ... on APIError {
          errorType
          errorTitle
          errorDetail
        }

      }
    }`,
    variables: {
      filter: filter || '',
    },
    queryKey: 'carriers',
  };

  return axiosInstance.post(url, data);
};

export const getUserStatuses = async (): Promise<
  AxiosResponse<{ values: string[] }>
> => {
  const url = `/api/gearbox`;
  const data = {
    query: `query portalUserStatusQuery {
      portalUserStatus {
        __typename
        ... on StringArray {
          values
        }
        ... on APIError {
          errorType
          errorTitle
          errorDetail
        }
      }
    }`,
    variables: {},
    queryKey: 'portalUserStatus',
  };
  return axiosInstance.post(url, data);
};

export const patchUser = async (
  id: number,
  status?: string,
  carrierCode?: string
): Promise<AxiosResponse<User>> => {
  const url = `/api/gearbox`;

  const variables: {
    userId?: number;
    status?: string;
    carrierCode?: string;
  } = { userId: id };

  if (status) {
    variables.status = status;
  }

  if (carrierCode) {
    variables.carrierCode = carrierCode;
  }

  const data = {
    query: `mutation updateUser($userId: Int!, $carrierCode: String!, $status: String!) {
      portalUserUpdate(userId: $userId, carrierCode: $carrierCode, status: $status) {
        __typename
        ... on UserUpdate {
          portalUser {
            portal_user_id
            username
            status
            first_name
            middle_name
            last_name
            phone
            created_on
            updated_on
            carrier {
              carrier_id
              carrier
              carrier_code
            }
            portal_roles {
              portal_role_id
              name
            }
          }
        }
            ... on APIError {
          errorType
          errorTitle
          errorDetail
        }
      }
    }`,
    variables,
    queryKey: 'portalUserUpdate',
  };
  return axiosInstance.post(url, data);
};

export const postSignUp = async (
  username: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<AxiosResponse<User>> =>
  axiosInstance.post(`/api/signup`, {
    username,
    password,
    firstName,
    lastName,
  });

export const postSignIn = async (
  email: string,
  password: string
): Promise<AxiosResponse<IdToken>> => {
  const url = '/api/signin';
  const data = {
    email,
    password,
  };
  return axiosInstance.post(url, data);
};

export const getShipments = async (
  status: ShipmentStatus,
  user: string
): Promise<AxiosResponse<{ shipments: Shipment[] }>> => {
  const url = '/api/gearbox';
  const data = {
    query: `query portalShipmentsQuery($user: String!, $status: String!) {
      portalShipments(user: $user, status: $status) {
        __typename
        ... on PortalShipmentsArray {
          shipments{
            date_posted
            year
            make
            model
            vin
            notes
            estimated_arrival
            estimated_delivery
            date_delivered
            date_cancelled
            origin_address {
              street_line_1
              street_line_2
              city
              state
              zipcode
              to_string
            }
            destination_address {
              street_line_1
              street_line_2
              city
              state
              zipcode
              to_string
            }
            blackout_dates {
              start
              stop
              to_string
            }
          }
        }
        ... on APIError {
          errorType
          errorTitle
          errorDetail
        }
      }
    }`,
    variables: { user, status },
    queryKey: 'portalShipments',
  };
  return axiosInstance.post(url, data);
};
