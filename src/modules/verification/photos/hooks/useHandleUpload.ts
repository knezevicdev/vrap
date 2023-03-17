import { ActualFileObject } from 'filepond';
import { MutableRefObject, useCallback } from 'react';

import {
  DocumentFileType,
  uploadVehiclePhoto,
} from '../utils/uploadVehiclePhoto';

interface UseHandleUpload {
  handleUpload: (
    file: ActualFileObject,
    type: DocumentFileType
  ) => Promise<boolean>;
}

const useHandleUpload = (
  vin: string,
  priceId: string,
  processingFiles: MutableRefObject<DocumentFileType[]>,
  refetchImages: () => void
): UseHandleUpload => {
  const handleUpload = useCallback(
    async (file: ActualFileObject, type: DocumentFileType) => {
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
    },
    [priceId, processingFiles, refetchImages, vin]
  );

  return {
    handleUpload,
  };
};

export default useHandleUpload;
