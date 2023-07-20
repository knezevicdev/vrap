import { useABSmartly } from '@vroom-web/analytics-integration';
import { VroomHeader } from '@vroom-web/shared-components';
import React, { useContext, useEffect, useState } from 'react';

import AuthManager from '../../utils/AuthManager';

import { AnalyticsHandlerContext } from 'src/integrations/AnalyticHandlerContext';
import { CatSDKContext } from 'src/integrations/CatSDKContext';
import client from 'src/networking/client';

const HeaderView: React.FC = () => {
  const catSDK = useContext(CatSDKContext);
  const analyticsHandler = useContext(AnalyticsHandlerContext);
  const absmartly = useABSmartly();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInListener = () => {
      setLoggedIn(true);
    };

    AuthManager.addSignInListener(loggedInListener);

    return () => {
      AuthManager.removeSignInListener(loggedInListener);
    };
  }, []);

  return (
    <div data-qa={'fullheader'}>
      <VroomHeader
        client={client}
        analyticsHandler={analyticsHandler}
        absmartly={absmartly}
        catSDK={catSDK}
        key={loggedIn ? 'loggedIn' : 'loggedOut'}
      />
    </div>
  );
};

export default HeaderView;
