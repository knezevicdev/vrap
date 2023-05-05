import { isErrorResponse, Response } from '@vroom-web/networking';

import client from '../client';

const noZipFoundResponse = { data: { isZipValid: false } };

export const getZipCodeValidation = (() => {
  const cachedZipCodes: Record<string, { isZipValid: boolean }> = {};
  const requestQueue: Record<
    string,
    Promise<Response<{ isZipValid: boolean }>> | undefined
  > = {};

  return async (zipCode: string) => {
    if (!/^[0-9]{5}$/.test(zipCode)) return noZipFoundResponse;

    if (cachedZipCodes[zipCode]) return { data: cachedZipCodes[zipCode] };

    const queuedRequest = requestQueue[zipCode];
    if (queuedRequest) {
      const res = await queuedRequest;
      if (isErrorResponse(res)) return noZipFoundResponse;
      return res;
    }

    const url = `/appraisal/api/zip/${zipCode}/validation`;
    const resPromise = client.httpRequest<{ isZipValid: boolean }>({
      method: 'get',
      url,
    });

    requestQueue[zipCode] = resPromise;

    const res = await resPromise;
    if (isErrorResponse(res)) return noZipFoundResponse;
    cachedZipCodes[zipCode] = res.data;
    delete requestQueue[zipCode];

    return res;
  };
})();

export const getZipCodeState = async (
  zipCode: string
): Promise<null | string> => {
  const url = `/appraisal/api/zip/${zipCode}/state`;
  const res = await client.httpRequest<{ state: string }>({
    method: 'get',
    url,
  });
  if (isErrorResponse(res)) return null;

  return res.data.state;
};
