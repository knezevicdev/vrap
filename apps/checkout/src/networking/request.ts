import { GQLTypes, Response } from '@vroom-web/networking';

import client from './client';
import { getTestDeal } from './util/getTestDeal';

import DEAL_VALIDATOR from 'src/graphql/queries/dealValidator.graphql';
import GET_USER_DEAL from 'src/graphql/queries/getUserDeal.graphql';
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

export const getPurchaseValidator = async (
  vin: string[],
  headers?: Record<string, string> | undefined,
  inDealID?: number,
  inDealStatus?: string[]
): Promise<Response<DealValidatorData>> => {
  const { dealID, dealStatus } = getTestDeal(inDealID, inDealStatus);
  console.log("dealIDdealIDdealIDdealID", dealID)
  const res = await client.gqlRequest<
    DealValidatorData,
    GQLTypes.UserDealsArgs | GQLTypes.QueryInvSearchArgs
  >({
    document: DEAL_VALIDATOR,
    variables: {
      dealID,
      dealStatus,
      vin,
      source: 'vroom-web | Checkout',
    },
    headers,
  });

  return res;
};
