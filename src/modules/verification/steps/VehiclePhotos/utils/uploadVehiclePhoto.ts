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

  const url = publicRuntimeConfig.ICO_DASH_UPLOAD_URL
    ? publicRuntimeConfig.ICO_DASH_UPLOAD_URL
    : publicRuntimeConfig.ICO_DASH_URL;
  const auth = publicRuntimeConfig.ICO_DASH_UPLOAD_AUTH
    ? publicRuntimeConfig.ICO_DASH_UPLOAD_AUTH
    : publicRuntimeConfig.ICO_DASH_AUTH;
  const apiOverride = publicRuntimeConfig.ICO_DASH_UPLOAD_OVERRIDE
    ? publicRuntimeConfig.ICO_DASH_UPLOAD_OVERRIDE
    : publicRuntimeConfig.ICO_DASH_OVERRIDE;

  const hasAuth = !!auth;
  if (hasAuth) {
    headers.Authorization = auth;
  }

  try {
    const response = await fetch(
      `${url}/api/appraisal-photos/upload?priceId=${priceId}&fileType=${fileType}&vin=${vin}${
        apiOverride ? `&apiOverride=${apiOverride}` : ''
      }`,
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
