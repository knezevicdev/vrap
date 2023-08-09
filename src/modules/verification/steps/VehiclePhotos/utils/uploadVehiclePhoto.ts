import crypto from 'crypto';
import { ActualFileObject } from 'filepond';
import getConfig from 'next/config';

import removeFileMetadataAndGenerateBase64 from './removeFileMetadataAndGenerateBase64';

const { publicRuntimeConfig } = getConfig();

export enum DocumentFileType {
  DRIVER_SIDE_EXTERIOR = 'driverSideExterior',
  PASSENGER_SIDE_EXTERIOR = 'passengerSideExterior',
  FRONT = 'front',
  BACK = 'back',
  DASH_INSTRUMENT_CLUSTER = 'dashCluster',
  DRIVER_SIDE_FRONT_SEAT = 'driverSideFrontSeat',
}

export const uploadVehiclePhoto = async (
  file: ActualFileObject,
  fileType: DocumentFileType,
  vin: string,
  priceId: string
): Promise<boolean> => {
  const base64Uri = (await removeFileMetadataAndGenerateBase64(file))
    .split(';base64,')
    .pop();
  if (!base64Uri) return false;

  const chunks = [];

  let index = 0;
  while (index < base64Uri.length) {
    chunks.push(base64Uri.slice(index, index + 100_000)); // make chunks of 400kB each
    index += 100_000;
  }

  const headers: Record<string, string> = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json',
  };

  const hasAuth = publicRuntimeConfig.ICO_DASH_AUTH;
  if (publicRuntimeConfig.ICO_DASH_AUTH) {
    headers.Authorization = publicRuntimeConfig.ICO_DASH_AUTH;
  }

  const identifier = crypto.randomBytes(16).toString('hex');

  for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
    try {
      const response = await fetch(
        `${publicRuntimeConfig.ICO_DASH_URL}/api/appraisal-photos/chunked`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            fileType,
            priceId,
            identifier,
            totalChunks: chunks.length,
            chunkIndex,
            payload: chunks[chunkIndex],
            vin,
          }),
          ...(hasAuth
            ? {
                mode: 'cors',
              }
            : {
                mode: 'cors',
              }),
        }
      );

      if (!response.ok) {
        console.error(
          `Error uploading vehicle photo. Status: ${response.status}`
        );
        return false;
      }
    } catch (error) {
      console.error('Error uploading vehicle photo:', error);
      return false;
    }
  }

  return true;
};
