import { ActualFileObject } from 'filepond';
import { useCallback, useRef } from 'react';

import {
  DocumentFileType,
  uploadVerificationDocument,
} from '../utils/uploadVerificationDocument';

import { useAppStore } from 'src/context';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import serializeError from 'src/utils/serializeError';

interface UseHandleUpload {
  handleUpload: (
    file: ActualFileObject,
    type: DocumentFileType
  ) => Promise<boolean>;
}

const useHandleUpload = (priceId: string): UseHandleUpload => {
  const { store } = useAppStore();
  const analyticsHandler = useRef(new AnalyticsHandler());

  const handleUpload = useCallback(
    async (file: ActualFileObject, type: DocumentFileType) => {
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
        analyticsHandler.current.trackDocTypeUploaded(type, priceId, fileId);
        return true;
      } catch (e) {
        let message = 'Document upload failed';
        if (e instanceof Error) message = e.message;
        analyticsHandler.current.trackDocTypeUploadError(
          type,
          priceId,
          message,
          serializeError(e)
        );
        return false;
      }
    },
    [priceId, store.verification]
  );

  return {
    handleUpload,
  };
};

export default useHandleUpload;
