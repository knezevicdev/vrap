import { Response } from '@vroom-web/networking';
import getConfig from 'next/config';

import { WebLeadsPayload, WebLeadUserData } from '../../interfaces.d';
import client from '../client';
import { formWebLeadPayload } from '../utils';

const { publicRuntimeConfig } = getConfig();
const VROOM_URL = publicRuntimeConfig.VROOM_URL;

export const postEmailCapture = async (
  emailAddress: string,
  marketingId: string
): Promise<Response<any>> => {
  // need to change response type
  const searchParams = { searchall: '-' };
  const contextData = { category: 'sell' };
  const payload = { emailAddress, marketingId, searchParams, contextData };
  const url = `${VROOM_URL}/horn/v2/email-capture`;
  return await client.httpRequest({
    method: 'post',
    url,
    data: { payload },
  });
};

export const submitWeblead = async (
  webleadUserData: WebLeadUserData
): Promise<Response<any>> => {
  const webleadPayload: WebLeadsPayload = formWebLeadPayload(webleadUserData);
  const webleadResponse = await client.httpRequest({
    method: 'POST',
    url: client.httpEndpoints.webleadsUrl,
    data: webleadPayload,
  });

  return webleadResponse;
};
