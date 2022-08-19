import { Response } from '@vroom-web/networking';
import { ActualFileObject } from 'filepond';
import getConfig from 'next/config';

import client from '../client';
import { DocumentResponse } from '../models/Verification';

const { publicRuntimeConfig } = getConfig();
const VROOM_URL = publicRuntimeConfig.NEXT_PUBLIC_VROOM_URL;

interface VerificationFileUploadUrlPayload {
  file_extension: string;
  file_type: string;
  original_file_name: string;
}

interface VerificationFileUploadResponse {
  data: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    FileUploadURL: string;
    id: string;
  };
}

export const getVerificationFileUploadUrl = async (
  priceId: string,
  payload: VerificationFileUploadUrlPayload
): Promise<Response<VerificationFileUploadResponse>> => {
  return await client.httpRequest({
    method: 'POST',
    url: `${client.httpEndpoints.interchangeUrl}/suyc-api/v1/acquisition/verification/getuploadurl`,
    data: {
      correlationId: priceId,
      payload,
    },
  });
};

export const uploadVerificationFile = async (
  url: string,
  file: ActualFileObject
): Promise<Response<any>> => {
  return await client.httpRequest({
    method: 'PUT',
    url,
    data: file,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: 15000,
  });
};

export const deleteVerificationFile = async (
  fileId: string
): Promise<Response<any>> => {
  return await client.httpRequest({
    method: 'DELETE',
    url: `${VROOM_URL}/suyc-api/v1/acquisition/verification/file?fid=${fileId}`,
    data: {
      source: 'vroom.com',
      version: '1',
      timestamp: new Date().toISOString(),
      payload: {},
    },
  });
};

export const getDownloadUrl = async (
  fileId: string | null,
  offerId: string
): Promise<Response<DocumentResponse>> => {
  const url = `${VROOM_URL}/suyc-api/v1/acquisition/verification/getdownloadurl?file=true&fid=${fileId}&offerId=${offerId}`;
  return await client.httpRequest({
    method: 'get',
    url,
  });
};
