import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

import { useAppStore } from 'src/context';
import { IsUserSignIn } from 'src/networking/request';

const useHandleAppraisalRoutes = (): void => {
  const router = useRouter();
  const { store } = useAppStore();

  const { isTradeIn } = store.appraisal;

  const redirectToLogin = (): void => {
    window.location.href = `/myaccount/login?redirect=${encodeURIComponent(
      window.location.pathname + window.location.search
    )}`;
  };

  const redirectIfNotLoggedIn = useCallback(async (): Promise<void> => {
    try {
      const isLoggedIn = await IsUserSignIn();
      if (!isLoggedIn) {
        redirectToLogin();
      }
    } catch (e) {
      redirectToLogin();
    }
  }, []);

  useEffect(() => {
    if (!isTradeIn && router.asPath.startsWith('/tradeIn-selfService')) {
      store.appraisal.setIsTradeIn(true);
      redirectIfNotLoggedIn();
    }
  }, [isTradeIn, redirectIfNotLoggedIn, router.asPath, store.appraisal]);
};

export default useHandleAppraisalRoutes;
