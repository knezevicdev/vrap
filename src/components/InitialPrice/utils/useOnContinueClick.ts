import { useCallback, useState } from 'react';

import AnalyticsHandler from '../../../integrations/AnalyticsHandler';
import checkSignInStatus from './checkSignInStatus';

const useOnContinueClick = (
  analyticsHandler: AnalyticsHandler,
  verificationUrl: string
) => {
  const [isAcceptingPrice, setIsAcceptingPrice] = useState(false);

  const onContinueClick = useCallback(async (): Promise<boolean> => {
    setIsAcceptingPrice(true);
    analyticsHandler.trackContinueClick();

    const isSignedIn = await checkSignInStatus();

    if (isSignedIn) {
      window.location.href = verificationUrl;
    }
    setIsAcceptingPrice(false);

    return isSignedIn;
  }, [analyticsHandler, verificationUrl]);

  return {
    isAcceptingPrice,
    onContinueClick,
  };
};

export default useOnContinueClick;
