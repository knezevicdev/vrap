import { FullHeader } from '@vroom-web/shared-components';
import React, { useContext } from 'react';

import { AnalyticsHandlerContext } from 'src/integrations/AnalyticHandlerContext';
import { CatSDKContext } from 'src/integrations/CatSDKContext';
import { RemoteConfigContext } from 'src/integrations/RemoteConfigContext';
import client from 'src/networking/client';

const HeaderView: React.FC = () => {
  const remoteConfig = useContext(RemoteConfigContext);
  const catSDK = useContext(CatSDKContext);
  const analyticsHandler = useContext(AnalyticsHandlerContext);

  return (
    <div data-qa={'fullheader'}>
      <FullHeader
        client={client}
        analyticsHandler={analyticsHandler}
        remoteConfig={remoteConfig}
        catSDK={catSDK}
      />
    </div>
  );
};

export default HeaderView;
