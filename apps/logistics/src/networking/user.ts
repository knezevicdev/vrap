import { AxiosResponse } from 'axios';

import { Carrier, User } from './models/User';
import { axiosInstance, GEARBOX_URL } from './Networker';

export const getUsers = async (
  carrierCode: string,
  status: string
): Promise<AxiosResponse<{ users: User[] }>> => {
  const data = {
    query: `query portalUsersQuery($carrier: String!, $status: String!) {
      portalUsers(carrier: $carrier, status: $status) {
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
    variables: { carrier: carrierCode, status: status },
    queryKey: 'portalUsers',
  };

  return axiosInstance.post(GEARBOX_URL, data);
};

export const getCarriers = async (variables: {
  filter: string;
  portalVisible: boolean;
}): Promise<AxiosResponse<{ carriers: Carrier[] }>> => {
  const data = {
    query: `
      query carriersQuery($filter: String!, $portalVisible: Boolean) {
        carriers(filter: $filter, portalVisible: $portalVisible) {
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
      }
    `,
    variables,
    queryKey: 'carriers',
  };

  return axiosInstance.post(GEARBOX_URL, data);
};

export const getUserStatuses = async (): Promise<
  AxiosResponse<{ values: string[] }>
> => {
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
  return axiosInstance.post(GEARBOX_URL, data);
};

export const patchUser = async (
  id: number,
  status?: string,
  carrierCode?: string
): Promise<AxiosResponse<User>> => {
  const variables: { userId: number; status?: string; carrierCode?: string } = {
    userId: id,
  };

  if (status) {
    variables.status = status;
  }

  if (carrierCode) {
    variables.carrierCode = carrierCode;
  }

  const data = {
    query: `mutation updateUser($userId: Int!, $carrierCode: String, $status: String) {
      portalUserUpdate(userId: $userId, carrierCode: $carrierCode, status: $status) {
        __typename
        ... on PortalUser {
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
  return axiosInstance.post(GEARBOX_URL, data);
};

export const postCreateAccountEmail = async (variables: {
  emailAddress: string;
  signupUrl: string;
}): Promise<void> => {
  const data = {
    query: `
    mutation sendAccountCreateEmail($emailAddress: String!, $signupUrl: String!) {
      portalUserCreateAccountEmail(emailAddress: $emailAddress, signupUrl: $signupUrl) {
        __typename
            ... on APIError {
          errorType
          errorTitle
          errorDetail
        }
      }
    }
    `,
    variables,
    queryKey: 'portalUserCreateAccountEmail',
  };
  return axiosInstance.post(GEARBOX_URL, data);
};
