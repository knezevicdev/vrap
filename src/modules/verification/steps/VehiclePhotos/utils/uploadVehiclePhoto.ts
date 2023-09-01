import { ActualFileObject } from 'filepond';
import getConfig from 'next/config';

import { VehiclePhotosKey } from '../../../store/photosVerification';
import useVerificationStore from '../../../store/store';
import removeFileMetadataAndGenerateBuffer from './removeFileMetadataAndGenerateBuffer';
import { photosKeyToDocumentFileType } from './useGetPhotosUploadProps';

import client from 'src/networking/client';

const { publicRuntimeConfig } = getConfig();

export enum DocumentFileType {
  DRIVER_SIDE_EXTERIOR = 'driverSideExterior',
  PASSENGER_SIDE_EXTERIOR = 'passengerSideExterior',
  FRONT = 'front',
  BACK = 'back',
  DASH_INSTRUMENT_CLUSTER = 'dashCluster',
  DRIVER_SIDE_FRONT_SEAT = 'driverSideFrontSeat',
}

const noticePhotoUploaded = async (vin: string): Promise<void> => {
  await client.httpRequest({
    method: 'POST',
    url: '/appraisal/api/notice-photo-uploaded',
    data: { vin },
  });
};

const shouldNoticePhotoUploaded = (fileType: DocumentFileType) => {
  const state = useVerificationStore.getState();

  const photos = {
    photosDriverSide: state.photosDriverSide,
    photosPassengerSide: state.photosPassengerSide,
    photosFront: state.photosFront,
    photosBack: state.photosBack,
    photosDash: state.photosDash,
    photosFrontSeat: state.photosFrontSeat,
  };

  const photosLeftToUpload = Object.entries(photos)
    .filter(([, photoUrl]) => !photoUrl)
    .map(([key]) => photosKeyToDocumentFileType[key as VehiclePhotosKey]);

  return (
    photosLeftToUpload.length === 0 ||
    (photosLeftToUpload.length === 1 && photosLeftToUpload[0] === fileType)
  );
};

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
    Authorization: publicRuntimeConfig.ICO_DASH_AUTH,
  };

  const apiOverride = publicRuntimeConfig.ICO_DASH_OVERRIDE;

  try {
    const response = await fetch(
      `${
        publicRuntimeConfig.ICO_DASH_URL
      }/api/appraisal-photos/upload?priceId=${priceId}&fileType=${fileType}&vin=${vin}${
        apiOverride ? `&apiOverride=${apiOverride}` : ''
      }`,
      {
        method: 'POST',
        headers,
        body: fileBuffer,
        mode: 'cors',
      }
    );

    if (response.ok && shouldNoticePhotoUploaded(fileType)) {
      noticePhotoUploaded(vin).catch((error) => {
        console.warn('Error calling noticePhotoUploaded:', error);
      });
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
