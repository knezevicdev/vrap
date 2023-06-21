import getConfig from 'next/config';
import { useCallback } from 'react';
import { shallow } from 'zustand/shallow';

import { DocumentUploadProps } from '../../../components/DocumentUpload';
import { VehiclePhotosKey } from '../../../store/photosVerification';
import useVerificationStore from '../../../store/store';
import { DocumentFileType, uploadVehiclePhoto } from './uploadVehiclePhoto';

const { publicRuntimeConfig } = getConfig();

export const photosUploadProps: Record<
  VehiclePhotosKey,
  Pick<DocumentUploadProps, 'label' | 'description' | 'example'>
> = {
  photosDriverSide: {
    label: 'Driver Side - Exterior',
    description:
      "A photo of the driver's side of the vehicle from the exterior.",
  },
  photosPassengerSide: {
    label: 'Passenger Side - Exterior',
    description:
      "A photo of the passenger's side of the vehicle from the exterior.",
  },
  photosFront: {
    label: 'Front',
    description: 'A photo of the front of the vehicle.',
  },
  photosBack: {
    label: 'Back',
    description: 'A photo of the back of the vehicle.',
  },
  photosDash: {
    label: 'Dash/Instrument Cluster',
    description: "A photo of the vehicle's dash or instrument cluster.",
  },
  photosFrontSeat: {
    label: 'Driver Side - Front Seat',
    description: "A photo of the driver's side front seat of the vehicle.",
  },
};

const photosKeyToDocumentFileType: Record<VehiclePhotosKey, DocumentFileType> =
  {
    photosDriverSide: DocumentFileType.DRIVER_SIDE_EXTERIOR,
    photosPassengerSide: DocumentFileType.PASSENGER_SIDE_EXTERIOR,
    photosFront: DocumentFileType.FRONT,
    photosBack: DocumentFileType.BACK,
    photosDash: DocumentFileType.DASH_INSTRUMENT_CLUSTER,
    photosFrontSeat: DocumentFileType.DRIVER_SIDE_FRONT_SEAT,
  };

const useGetPhotosUploadProps = () => {
  const priceId = useVerificationStore((state) => state.priceId);
  const vin = useVerificationStore((state) => state.vin);

  const photos = useVerificationStore(
    (state) => ({
      photosDriverSide: state.photosDriverSide,
      photosPassengerSide: state.photosPassengerSide,
      photosFront: state.photosFront,
      photosBack: state.photosBack,
      photosDash: state.photosDash,
      photosFrontSeat: state.photosFrontSeat,
    }),
    shallow
  );
  const setPhotoUrl = useVerificationStore((state) => state.setPhotoUrl);

  const uploadPhoto = useCallback(
    async (
      file: File,
      type: DocumentFileType,
      verificationDocumentKey: VehiclePhotosKey
    ) => {
      try {
        await uploadVehiclePhoto(file, type, vin, priceId);
        setPhotoUrl(
          verificationDocumentKey,
          `${publicRuntimeConfig.VAST_IMAGE_PROXY_URL}/${vin}/verification/${priceId}-${type}.jpeg`
        );
        return true;
      } catch {
        return false;
      }
    },
    [priceId, setPhotoUrl, vin]
  );

  return useCallback(
    (photosKey: VehiclePhotosKey): DocumentUploadProps => {
      return {
        ...photosUploadProps[photosKey],
        handleUpload: async (file) =>
          uploadPhoto(file, photosKeyToDocumentFileType[photosKey], photosKey),
        uploaded: !!photos[photosKey],
        disallowPdf: true,
        buttonLabel: 'Upload photo',
      };
    },
    [photos, uploadPhoto]
  );
};

export default useGetPhotosUploadProps;
