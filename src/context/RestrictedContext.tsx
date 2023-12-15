import getConfig from 'next/config';
import React, { useEffect, useState } from 'react';

import {
  defaultRestrictedContextValue,
  getRestrictedAppraisalContext,
  RestrictedAppraisalContext,
  RestrictedAppraisalContextType,
} from '../integrations/RestrictedAppraisalContext';

const { publicRuntimeConfig } = getConfig();

const RestrictedContext = ({ children }: { children: React.ReactNode }) => {
  const [restrictedContextValue, setRestrictedContextValue] =
    useState<RestrictedAppraisalContextType>(defaultRestrictedContextValue);
  const [restrictedContextValueLoaded, setRestrictedContextValueLoaded] =
    useState(false);

  useEffect(() => {
    let unmounted = false;

    getRestrictedAppraisalContext(publicRuntimeConfig.FIREBASE_CONFIG).then(
      (restrictedContextValue) => {
        if (unmounted) return;
        setRestrictedContextValue(restrictedContextValue);
        setRestrictedContextValueLoaded(true);
      }
    );

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <RestrictedAppraisalContext.Provider
      value={{
        value: restrictedContextValue,
        loaded: restrictedContextValueLoaded,
      }}
    >
      {children}
    </RestrictedAppraisalContext.Provider>
  );
};

export default RestrictedContext;
