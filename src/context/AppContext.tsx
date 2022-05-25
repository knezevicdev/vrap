import { ABSmartlyModel } from '@vroom-web/absmartly-integration';
import { Status as NetworkingStatus } from '@vroom-web/networking';
import getConfig from 'next/config';
import React, { ReactNode, useEffect, useMemo } from 'react';

import AppStoreNetwork, { AppStoreNetworkContext } from './index';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

const { publicRuntimeConfig } = getConfig();

interface Prop {
  children: ReactNode;
}

const AppProvider = ({ children }: Prop): JSX.Element => {
  const appStore: AppStoreNetwork = useMemo(() => new AppStoreNetwork(), []);
  const { store } = appStore;
  const analyticsHandler = new AnalyticsHandler();

  useEffect(() => {
    const abSmartlyModel = new ABSmartlyModel({
      endpoint: publicRuntimeConfig.NEXT_PUBLIC_ABSMARTLY_URL,
      apiKey: publicRuntimeConfig.ABSMARTLY_API_KEY,
      environment: publicRuntimeConfig.ABSMARTLY_ENV,
      application: publicRuntimeConfig.ABSMARTLY_APP,
    });
    store.absmart.setABSmartlyModel(abSmartlyModel);

    const checkAnalytics = window.setTimeout(() => {
      store.absmart.abSmartlyModel?.setStatus(NetworkingStatus.ERROR);
    }, 3500);

    analyticsHandler.onAnalyticsReady(async () => {
      clearTimeout(checkAnalytics);
      const sessionId = analyticsHandler.getAnonymousId();
      if (sessionId) {
        await abSmartlyModel?.initABSmartly(sessionId);
      } else {
        abSmartlyModel?.setStatus(NetworkingStatus.ERROR);
      }

      analyticsHandler.trackWebAppViewed();
    });
  }, [appStore]);

  return (
    <AppStoreNetworkContext.Provider value={appStore}>
      {children}
    </AppStoreNetworkContext.Provider>
  );
};

export default AppProvider;
