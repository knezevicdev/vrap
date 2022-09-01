import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

import { useAppStore } from 'src/context';
import { isUserSignedIn } from 'src/networking/request';

const useHandleAppraisalRoutes = (): void => {
  const router = useRouter();
  const { store } = useAppStore();

  store.appraisal.setIsTradeIn(router.asPath.includes('/tradeIn-selfService'));

  const redirectToLogin = (): void => {
    window.location.href = `/myaccount/login?redirect=${encodeURIComponent(
      window.location.pathname + window.location.search
    )}`;
  };

  const redirectIfNotLoggedIn = useCallback(async (): Promise<void> => {
    try {
      const isLoggedIn = await isUserSignedIn();
      if (!isLoggedIn) {
        redirectToLogin();
      }
    } catch (e) {
      redirectToLogin();
    }
  }, []);

  useEffect(() => {
    if (store.appraisal.isTradeIn) {
      redirectIfNotLoggedIn();
    }
  }, [redirectIfNotLoggedIn, store.appraisal.isTradeIn]);
};

export default useHandleAppraisalRoutes;
