import { ActualFileObject } from 'filepond';
import getConfig from 'next/config';

import removeFileMetadataAndGenerateBuffer from './removeFileMetadataAndGenerateBuffer';

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
  const fileBuffer = await removeFileMetadataAndGenerateBuffer(file);

  const headers: Record<string, string> = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/octet-stream',
  };

  const hasAuth = publicRuntimeConfig.ICO_DASH_AUTH;
  if (publicRuntimeConfig.ICO_DASH_AUTH) {
    headers.Authorization = publicRuntimeConfig.ICO_DASH_AUTH;
  }

  try {
    const response = await fetch(
      `${publicRuntimeConfig.ICO_DASH_URL}/api/appraisal-photos/upload?priceId=${priceId}&fileType=${fileType}&vin=${vin}`,
      {
        method: 'POST',
        headers,
        body: fileBuffer,
        ...(hasAuth
          ? {
              mode: 'cors',
            }
          : {
              mode: 'no-cors',
            }),
      }
    );

    if (response.ok) {
      return true;
    } else {
      console.error(
        `Error uploading vehicle photo. Status: ${response.status}`
      );
      return false;
    }
  } catch (error) {
    console.error('Error uploading vehicle photo:', error);
    return false;
  }
};
