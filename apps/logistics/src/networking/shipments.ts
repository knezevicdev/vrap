import { AxiosResponse } from 'axios';

import { Counts, Shipment, ShipmentStatus } from './models/Shipments';
import { axiosInstance, GEARBOX_URL } from './Networker';

export const getShipments = async (
  status: ShipmentStatus,
  user: string,
  offset: number,
  limit: number
): Promise<AxiosResponse<{ shipments: Shipment[]; counts: Counts[] }>> => {
  const data = {
    query: `
      query portalShipmentsQuery($user: String!, $status: String!, $offset: Int!, $limit: Int!) {
        portalShipments(user: $user, status: $status, offset: $offset, limit: $limit) {
          __typename
          ... on PortalShipmentsArray {
            shipments {
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
            counts {
              status
              count
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
    variables: { user, status, offset, limit },
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
  const data = {
    query: `
      mutation updateShipmentStop(
        $shipmentId: Int!,
        $shipmentStopId: Int!,
        $idType: String!,
        $stopSequence: Int,
        $driverOnTheWay: Time,
        $milesTraveled: Int,
        $latitude: Float,
        $longitude: Float,
        $reestimatedReason: String,
        $estimatedArrival: Time,
        $estimatedDeparture: Time,
        $arrival: Time,
        $departure: Time
      ) {
        shipmentStopUpdate(
          shipmentId: $shipmentId,
          shipmentStopId: $shipmentStopId,
          idType: $idType,
          stopSequence: $stopSequence,
          driverOnTheWay: $driverOnTheWay,
          milesTraveled: $milesTraveled,
          latitude: $latitude,
          longitude: $longitude,
          reestimatedReason: $reestimatedReason,
          estimatedArrival: $estimatedArrival,
          estimatedDeparture: $estimatedDeparture,
          arrival: $arrival,
          departure: $departure
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
    queryKey: 'shipmentStopUpdate',
  };
  return axiosInstance.post(GEARBOX_URL, data);
};
