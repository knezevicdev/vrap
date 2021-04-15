import { GQLTypes, Response } from '@vroom-web/networking';

import client from './client';
import { getTestDeal } from './util/getTestDeal';

import DEAL_VALIDATOR from 'src/graphql/queries/dealValidator.graphql';
import GET_DECODE_VIN from 'src/graphql/queries/getDecodeVin.graphql';
import GE_PLATE_TO_VIN from 'src/graphql/queries/getPlateToVin.graphql';
import GET_USER_DEAL from 'src/graphql/queries/getUserDeal.graphql';
import GET_VEHICLE_TRADE from 'src/graphql/queries/getVehicleTrade.graphql';
interface Data {
  user: GQLTypes.User;
}

export const getCongratsData = async (
  inDealID?: number,
  inDealStatus?: string[]
): Promise<Response<Data>> => {
  //switch between the real deal and dealStatus or mock deal if exist
  const { dealID, dealStatus } = getTestDeal(inDealID, inDealStatus);

  const res = await client.gqlRequest<Data, GQLTypes.UserDealsArgs>({
    document: GET_USER_DEAL,
    variables: {
      dealID,
      dealStatus,
    },
  });

  return res;
};

export interface DealValidatorData {
  user: GQLTypes.User;
  invSearch: GQLTypes.InvSearchResult;
}
/**
 * Query for Modal Deal Validation Modals
 * @param vin
 * @param inDealID
 * @param inDealStatus
 */
export const getDealValidator = async (
  vin: string | undefined,
  inDealID?: number,
  inDealStatus?: string[]
): Promise<Response<DealValidatorData>> => {
  const { dealID, dealStatus } = getTestDeal(inDealID, inDealStatus);
  const res = await client.gqlRequest<
    DealValidatorData,
    GQLTypes.UserDealsArgs | GQLTypes.QueryInvSearchArgs
  >({
    document: DEAL_VALIDATOR,
    variables: {
      dealID,
      dealStatus,
      vin: vin ? [vin] : undefined,
      source: 'vroom-web | Checkout | Init App',
    },
  });

  return res;
};

/**
 * Get Data for vehicle trade step
 * @param vin
 * @param inDealID
 * @param inDealStatus
 */

export const getVehicleTrade = async (
  inDealID?: number,
  inDealStatus?: string[]
): Promise<Response<DealValidatorData>> => {
  //switch between the real deal and dealStatus or mock deal if exist
  const { dealID, dealStatus } = getTestDeal(inDealID, inDealStatus);
  const res = await client.gqlRequest<
    DealValidatorData,
    GQLTypes.UserDealsArgs
  >({
    document: GET_VEHICLE_TRADE,
    variables: {
      dealID,
      dealStatus,
    },
  });

  return res;
};

export interface LicensePlateToVinData {
  licensePlateToVin: GQLTypes.LpToVin;
}

/**
 * Get VIN number from the Plate and User State
 * @param lp
 * @param state
 */

export const getPlateToVin = async (
  lp: string,
  state: string
): Promise<Response<LicensePlateToVinData>> => {
  const res = await client.gqlRequest<
    LicensePlateToVinData,
    GQLTypes.QueryLicensePlateToVinArgs
  >({
    document: GE_PLATE_TO_VIN,
    variables: {
      lp,
      state,
      source: 'vroom.com | checkout',
    },
  });

  return res;
};

export interface DecodeVinData {
  decodeVIN: GQLTypes.VinData;
}

/**
 * Get vehicle Information from the VIN number
 * @param vin
 * @param colors
 * @param options optional
 */

export const decodeVin = async (
  vin: string,
  colors: boolean,
  options?: boolean
): Promise<Response<DecodeVinData>> => {
  const res = await client.gqlRequest<
    DecodeVinData,
    GQLTypes.QueryDecodeVinArgs
  >({
    document: GET_DECODE_VIN,
    variables: {
      vin,
      colors,
      options,
      source: 'vroom.com | checkout',
    },
  });

  return res;
};
