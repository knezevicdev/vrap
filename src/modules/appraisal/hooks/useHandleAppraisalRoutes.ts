import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { useAppStore } from 'src/context';
import { IsUserSignIn } from 'src/networking/request';

const useHandleAppraisalRoutes = (): void => {
  const router = useRouter();
  const { store } = useAppStore();

  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean | null>(null);
  const isUserStatusLoaded: boolean = isUserLoggedIn !== null;
  const isTradeIn = store.appraisal.isTradeIn;

  const checkIfUserLoggedIn = useCallback(async (): Promise<void> => {
    try {
      const isLoggedIn = await IsUserSignIn();
      setIsUserLoggedIn(isLoggedIn);
    } catch (e) {
      setIsUserLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (!isTradeIn && router.asPath.startsWith('/tradeIn-selfService')) {
      store.appraisal.setIsTradeIn(true);
    }
  }, [isTradeIn, router, router.asPath, store.appraisal]);

  useEffect(() => {
    checkIfUserLoggedIn();
  }, [checkIfUserLoggedIn]);

  useEffect(() => {
    if (isTradeIn && isUserStatusLoaded && !isUserLoggedIn) {
      window.location.href = `/myaccount/login?redirect=${encodeURIComponent(
        window.location.pathname + window.location.search
      )}`;
    }
  }, [isUserLoggedIn, isTradeIn, isUserStatusLoaded]);
};

export default useHandleAppraisalRoutes;
