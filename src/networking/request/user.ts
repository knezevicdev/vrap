import { GQLTypes, isErrorResponse } from '@vroom-web/networking';

import GET_USER from '../../graphql/queries/getUser.graphql';
import client from '../client';

export const isUserSignedIn = async (): Promise<boolean> => {
  const signInStatusResp = await client.signInStatus();
  if (isErrorResponse(signInStatusResp)) throw signInStatusResp;
  return (
    signInStatusResp &&
    signInStatusResp.data &&
    signInStatusResp.data.status === 'active'
  );
};

export const getUser = async (): Promise<GQLTypes.User> => {
  const userResp = await client.gqlRequest<{ user: GQLTypes.User }>({
    document: GET_USER,
  });
  if (isErrorResponse(userResp)) throw userResp;
  return userResp.data.user;
};
