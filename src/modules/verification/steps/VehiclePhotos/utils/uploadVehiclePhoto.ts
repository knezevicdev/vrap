import axios from 'axios';
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

  if (publicRuntimeConfig.ICO_DASH_AUTH) {
    headers.Authorization = publicRuntimeConfig.ICO_DASH_AUTH;
  }

  await axios.post(
    `${publicRuntimeConfig.ICO_DASH_URL}/api/appraisal-photos/upload?priceId=${priceId}&fileType=${fileType}&vin=${vin}`,
    fileBuffer,
    {
      headers,
    }
  );

  return true;
};
