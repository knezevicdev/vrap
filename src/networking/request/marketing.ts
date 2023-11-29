import { Response } from '@vroom-web/networking';

import { WebLeadsPayload, WebLeadUserData } from '../../interfaces.d';
import client from '../client';
import { formWebLeadPayload } from '../utils';

export const submitWeblead = (
  webleadUserData: WebLeadUserData
): Promise<Response<any>> => {
  const webleadPayload: WebLeadsPayload = formWebLeadPayload(webleadUserData);
  return client.httpRequest({
    method: 'POST',
    url: client.httpEndpoints.webleadsUrl,
    data: webleadPayload,
  });
};
