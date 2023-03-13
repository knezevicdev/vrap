import { FilePondErrorDescription } from 'filepond';
import { useRef } from 'react';

import AnalyticsHandler from '../../../../integrations/AnalyticsHandler';
import { DocumentFileType } from '../utils/uploadVerificationDocument';

interface UseHandleError {
  handleError: (
    type: DocumentFileType
  ) => (e: FilePondErrorDescription) => void;
}

interface FilepondError {
  main: string;
  sub: string;
}

const useHandleError = (priceId: string): UseHandleError => {
  const analyticsHandler = useRef(new AnalyticsHandler());

  const handleError =
    (type: DocumentFileType) =>
    (err: FilePondErrorDescription): void => {
      const e = err as unknown as FilepondError;
      analyticsHandler.current.trackDocTypeUploadError(type, priceId, e.main);
    };

  return {
    handleError,
  };
};

export default useHandleError;
