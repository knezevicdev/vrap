import { GQLTypes, Response } from '@vroom-web/networking';

import client from './client';
import { getTestDeal } from './util/getTestDeal';

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
