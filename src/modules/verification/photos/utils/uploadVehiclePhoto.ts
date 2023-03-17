import axios from 'axios';
import { ActualFileObject } from 'filepond';

export enum DocumentFileType {
  DRIVER_SIDE_EXTERIOR = 'driverSideExterior',
  PASSENGER_SIDE_EXTERIOR = 'passengerSideExterior',
  FRONT = 'front',
  BACK = 'back',
  DASH_INSTRUMENT_CLUSTER = 'dashCluster',
  DRIVER_SIDE_FRONT_SEAT = 'driverSideFrontSeat',
}

function generateUniqueId(priceId: string) {
  const timestamp = new Date().getTime();
  return `${timestamp}-${priceId}`;
}

export const uploadVehiclePhoto = async (
  file: ActualFileObject,
  fileType: DocumentFileType,
  vin: string,
  priceId: string
): Promise<boolean> => {
  const uploadId = generateUniqueId(priceId);
  const chunkSize = 1024 * 100; // 100 KB

  const totalChunks = Math.ceil(file.size / chunkSize);

  for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
    const start = chunkIndex * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);

    const formData = new FormData();
    formData.append('chunk', chunk);

    await axios.post(
      `/appraisal/api/photos/${vin}/upload?priceId=${priceId}&fileType=${fileType}&uploadId=${uploadId}&chunkIndex=${chunkIndex}&totalChunks=${totalChunks}`,
      chunk,
      {
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      }
    );
  }

  return true;
};
