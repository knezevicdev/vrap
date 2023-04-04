import { useABSmartly } from '@vroom-web/analytics-integration';
import { VroomHeader } from '@vroom-web/shared-components';
import React, { useContext } from 'react';

import { AnalyticsHandlerContext } from 'src/integrations/AnalyticHandlerContext';
import { CatSDKContext } from 'src/integrations/CatSDKContext';
import client from 'src/networking/client';

const HeaderView: React.FC = () => {
  const catSDK = useContext(CatSDKContext);
  const analyticsHandler = useContext(AnalyticsHandlerContext);
  const absmartly = useABSmartly();

  return (
    <div data-qa={'fullheader'}>
      <VroomHeader
        client={client}
        analyticsHandler={analyticsHandler}
        absmartly={absmartly}
        catSDK={catSDK}
      />
    </div>
  );
};

export default HeaderView;
