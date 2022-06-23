import { ActualFileObject } from 'filepond';
import { useRef } from 'react';

import {
  DocumentFileType,
  uploadVerificationDocument,
} from '../utils/uploadVerificationDocument';

import { useAppStore } from 'src/context';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

interface UseHandleUpload {
  handleUpload: (
    type: DocumentFileType
  ) => (file: ActualFileObject) => Promise<boolean>;
}

const useHandleUpload = (priceId: string): UseHandleUpload => {
  const { store } = useAppStore();
  const analyticsHandler = useRef(new AnalyticsHandler());

  const handleUpload = (type: DocumentFileType) => async (
    file: ActualFileObject
  ) => {
    try {
      const { verificationKey, fileId } = await uploadVerificationDocument(
        file,
        type,
        priceId
      );
      store.verification.getVerificationDetail(
        {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ...store.verification.verificationDetail!,
          [verificationKey]: fileId,
        },
        store.verification.lastFourSSN
      );
      analyticsHandler.current.trackDocTypeUploaded(type);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  return {
    handleUpload,
  };
};

export default useHandleUpload;