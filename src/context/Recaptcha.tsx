import getConfig from 'next/config';
import React, { createContext, MutableRefObject, useMemo, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const { publicRuntimeConfig } = getConfig();

const { RECAPTCHA_SITE_KEY } = publicRuntimeConfig;

interface RecaptchaContextValue {
  recaptchaRef: MutableRefObject<ReCAPTCHA | null>;
}

export const RecaptchaContext = createContext<RecaptchaContextValue | null>(
  null
);

export const RecaptchaProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  return (
    <RecaptchaContext.Provider value={{ recaptchaRef }}>
      {children}
      <ReCAPTCHA
        sitekey={RECAPTCHA_SITE_KEY}
        ref={recaptchaRef}
        size="invisible"
      />
    </RecaptchaContext.Provider>
  );
};

export interface UseRecaptcha {
  getToken: () => Promise<string | null>;
}

export const useRecaptcha = (): UseRecaptcha => {
  const context = React.useContext(RecaptchaContext);

  if (!context) {
    throw new Error('useRecaptcha must be used within a RecaptchaProvider');
  }

  return useMemo<UseRecaptcha>(
    () => ({
      getToken: async () => {
        if (!context.recaptchaRef.current) return null;

        try {
          return await context.recaptchaRef.current.executeAsync();
        } catch (e) {
          return null;
        } finally {
          context.recaptchaRef.current.reset();
        }
      },
    }),
    [context.recaptchaRef]
  );
};
