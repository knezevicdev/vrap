import { FilePondErrorDescription } from 'filepond';
import { useCallback, useRef } from 'react';

import AnalyticsHandler from '../../../../integrations/AnalyticsHandler';
import { DocumentFileType } from '../utils/uploadVerificationDocument';

interface UseHandleError {
  handleError: (e: FilePondErrorDescription, type: DocumentFileType) => void;
}

interface FilepondError {
  main: string;
  sub: string;
}

const useHandleError = (priceId: string): UseHandleError => {
  const analyticsHandler = useRef(new AnalyticsHandler());

  const handleError = useCallback(
    (err: FilePondErrorDescription, type: DocumentFileType): void => {
      const e = err as unknown as FilepondError;
      analyticsHandler.current.trackDocTypeUploadError(type, priceId, e.main);
    },
    [priceId]
  );

  return {
    handleError,
  };
};

export default useHandleError;
