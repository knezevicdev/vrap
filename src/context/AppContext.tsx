import React, { ReactNode, useEffect, useMemo } from 'react';

import AppStoreNetwork, { AppStoreNetworkContext } from './index';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

interface Prop {
  children: ReactNode;
}

const AppProvider = ({ children }: Prop): JSX.Element => {
  const appStore: AppStoreNetwork = useMemo(() => new AppStoreNetwork(), []);
  const analyticsHandler = useMemo(() => new AnalyticsHandler(), []);

  useEffect(() => {
    analyticsHandler.onAnalyticsReady(async () => {
      analyticsHandler.trackWebAppViewed();
    });
  }, [analyticsHandler, appStore]);

  return (
    <AppStoreNetworkContext.Provider value={appStore}>
      {children}
    </AppStoreNetworkContext.Provider>
  );
};

export default AppProvider;
