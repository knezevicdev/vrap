import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import useIsMounted from '../hooks/useIsMounted';
import initFingerprint, { FingerprintResult } from '../utils/initFingerprint';

const FingerprintContext = createContext<FingerprintResult | undefined>(
  undefined
);

export default FingerprintContext;

export const useFingerprint = (): FingerprintResult => {
  const fingerprintContext = useContext(FingerprintContext);

  if (!fingerprintContext)
    throw new Error(
      'useFingerprint can only be used within FingerprintContext'
    );

  return fingerprintContext;
};

type UseInitFingerprint = {
  result: FingerprintResult;
  isLoading: boolean;
};

export const useInitFingerprint = (): UseInitFingerprint => {
  const isMounted = useIsMounted();
  const [result, setResult] = useState<FingerprintResult>({
    requestId: 'unknown',
    visitorId: 'unknown',
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchFingerprint = useCallback(async () => {
    setIsLoading(true);
    const fingerprintResult = await initFingerprint();
    if (!isMounted()) return;

    setResult(fingerprintResult);
    setIsLoading(false);
  }, [isMounted]);

  useEffect(() => {
    fetchFingerprint();
  }, [fetchFingerprint]);

  return {
    result,
    isLoading,
  };
};
