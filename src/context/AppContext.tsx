import React, { ReactNode, useEffect, useMemo } from 'react';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

interface Prop {
  children: ReactNode;
}

const AppProvider = ({ children }: Prop): JSX.Element => {
  const analyticsHandler = useMemo(() => new AnalyticsHandler(), []);

  useEffect(() => {
    analyticsHandler.onAnalyticsReady(async () => {
      analyticsHandler.trackWebAppViewed();
    });
  }, [analyticsHandler]);

  return <>{children}</>;
};

export default AppProvider;
