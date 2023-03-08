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

export const uploadVehiclePhoto = async (
  file: ActualFileObject,
  fileType: DocumentFileType,
  vin: string,
  priceId: string
): Promise<boolean> => {
  const data = new FormData();
  const fileExtension = file.name.split('.').pop();
  data.append('image', file, `${priceId}-${fileType}.${fileExtension}`);

  await axios.post(
    `/appraisal/api/photos/${vin}/upload?priceId=${priceId}`,
    data
  );

  return true;
};
