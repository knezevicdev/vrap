import { ActualFileObject } from 'filepond';

import {
  DocumentFileType,
  uploadVehiclePhoto,
} from '../utils/uploadVehiclePhoto';

interface UseHandleUpload {
  handleUpload: (
    type: DocumentFileType
  ) => (file: ActualFileObject) => Promise<boolean>;
}

const useHandleUpload = (
  vin: string,
  priceId: string,
  setLocalVehiclePhotos: (
    setter: (
      localVehiclePhotos: Partial<Record<DocumentFileType, boolean>>
    ) => Partial<Record<DocumentFileType, boolean>>
  ) => void
): UseHandleUpload => {
  const handleUpload =
    (type: DocumentFileType) => async (file: ActualFileObject) => {
      try {
        await uploadVehiclePhoto(file, type, vin, priceId);
        setLocalVehiclePhotos((localVehiclePhotos) => ({
          ...localVehiclePhotos,
          [type]: true,
        }));
        return true;
      } catch (e) {
        return false;
      }
    };

  return {
    handleUpload,
  };
};

export default useHandleUpload;
