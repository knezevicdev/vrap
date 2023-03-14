import { ActualFileObject } from 'filepond';
import { MutableRefObject } from 'react';

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
  processingFiles: MutableRefObject<DocumentFileType[]>,
  refetchImages: () => void
): UseHandleUpload => {
  const handleUpload =
    (type: DocumentFileType) => async (file: ActualFileObject) => {
      processingFiles.current = [...processingFiles.current, type];
      try {
        await uploadVehiclePhoto(file, type, vin, priceId);
        processingFiles.current = processingFiles.current.filter(
          (fileType) => fileType !== type
        );
        refetchImages();
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
