import axios, { AxiosResponse } from 'axios';

import { IdToken } from './models/Auth';
import { Shipment, ShipmentStatus } from './models/Shipments';
import { Carrier, User } from './models/User';

const GEARBOX_URL = '/api/gearbox';

export enum Status {
  INITIAL = 'initial',
  FETCHING = 'fetching',
  SUCCESS = 'success',
  ERROR = 'error',
}

const axiosInstance = axios.create();

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

export const getCarriers = async (
  filter: string
): Promise<AxiosResponse<{ carriers: Carrier[] }>> => {
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

  return axiosInstance.post(GEARBOX_URL, data);
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
  const data = {
    query: `
      query portalShipmentsQuery($user: String!, $status: String!) {
        portalShipments(user: $user, status: $status) {
          __typename
          ... on PortalShipmentsArray {
            shipments{
              shipment_id,
              date_posted
              year
              make
              model
              vin
              notes
              estimated_pickup
              actual_pickup
              estimated_delivery
              date_delivered
              date_cancelled
              status
              booked_date
              cancel_reason
              origin
              origin_address {
                stop_id,
                street_line_1
                street_line_2
                city
                state
                zipcode
                to_string
              }
              destination_address {
                stop_id,
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
              customer {
                  customer_id
                  name
                  phone
                  email
              }
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
    variables: { user, status },
    queryKey: 'portalShipments',
  };
  return axiosInstance.post(GEARBOX_URL, data);
};

export interface PatchShipment {
  id: number;
  idType: string;
  status: string;
  driverName?: string;
  driverContact?: string;
  carrierCode?: string;
  cancelReasonCode?: string;
  carrierAccepted?: string;
  carrierPickedUp?: string;
  cost?: number;
  postingDate?: string;
  bookedDate?: string;
  deliveryNotes?: string;
  cancelledDate?: string;
}
export const patchShipment = async (
  variables: PatchShipment
): Promise<void> => {
  console.log(variables);
  const data = {
    query: `
      mutation updateShipment(
        $id: Int!
        $idType: String!
        $status: String!
        $driverName: String
        $driverContact: String
        $carrierCode: String
        $cancelReasonCode: String
        $carrierAccepted: Time
        $carrierPickedUp: Time,
        $cost: Float,
        $postingDate: Time,
        $bookedDate: Time,
        $deliveryNotes: String,
        $cancelledDate: Time
      ) {
        shipmentUpdate(
          id: $id
          idType: $idType
          status: $status
          driverName: $driverName
          driverContact: $driverContact
          carrierCode: $carrierCode
          cancelReasonCode: $cancelReasonCode
          carrierAccepted: $carrierAccepted
          carrierPickedUp: $carrierPickedUp
          cost: $cost
          postingDate: $postingDate
          bookedDate: $bookedDate
          deliveryNotes: $deliveryNotes
          cancelledDate: $cancelledDate
        ) {
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
    queryKey: 'shipmentUpdate',
  };
  return axiosInstance.post(GEARBOX_URL, data);
};

export interface PatchShipmentStop {
  shipmentId: number;
  shipmentStopId: number;
  idType: string;
  stopSequence?: number;
  driverOnTheWay?: string;
  milesTraveled?: number;
  latitude?: number;
  longitude?: number;
  reestimatedReason?: string;
  estimatedArrival?: string;
  estimatedDeparture?: string;
  arrival?: string;
  departure?: string;
}
export const patchShipmentStop = async (
  variables: PatchShipmentStop
): Promise<void> => {
  console.log(variables);
  const data = {
    query: `mutation updateShipmentStop($shipmentId: Int!, $shipmentStopId: Int!, $idType: String!, $stopSequence: Int, $driverOnTheWay: Time, $milesTraveled: Int, $latitude: Float, $longitude: Float, $reestimatedReason: String, $estimatedArrival: Time, $estimatedDeparture: Time, $arrival: Time, $departure: Time) {
      shipmentStopUpdate(shipmentId: $shipmentId, shipmentStopId: $shipmentStopId, idType: $idType, stopSequence: $stopSequence, driverOnTheWay: $driverOnTheWay, milesTraveled: $milesTraveled, latitude: $latitude, longitude: $longitude, reestimatedReason: $reestimatedReason, estimatedArrival: $estimatedArrival, estimatedDeparture: $estimatedDeparture, arrival: $arrival, departure: $departure) {
        __typename
         ... on APIError {
          errorType
          errorTitle
          errorDetail
        }
      }
    }`,
    variables,
    queryKey: 'shipmentStopUpdate',
  };
  return axiosInstance.post(GEARBOX_URL, data);
};
