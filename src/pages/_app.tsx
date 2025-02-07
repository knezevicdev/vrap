import 'firebase/analytics';
import 'src/global.css';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css';

import { datadogRum } from '@datadog/browser-rum';
import { ABSmartlyProvider } from '@vroom-web/analytics-integration';
import { CatSDK } from '@vroom-web/cat-sdk';
import { isErrorResponse } from '@vroom-web/networking';
import { CommonHandler } from '@vroom-web/shared-components';
import { getVroomTheme, GlobalStyle } from '@vroom-web/ui-lib';
import App, { AppProps } from 'next/app';
import getConfig from 'next/config';
import packageInfo from 'package.json';
import React from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';

import LoggedOutDialog from '../components/LoggedOutDialog';
import { RecaptchaProvider } from '../context/Recaptcha';
import RestrictedContext from '../context/RestrictedContext';
import client from '../networking/client';

import AppProvider from 'src/context/AppContext';
import { AnalyticsHandlerContext } from 'src/integrations/AnalyticHandlerContext';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { CatSDKContext } from 'src/integrations/CatSDKContext';
import { saveUTMParams } from 'src/networking/utils';

const { publicRuntimeConfig } = getConfig();

const {
  ABSMARTLY_URL,
  ABSMARTLY_API_KEY,
  ABSMARTLY_ENV,
  ABSMARTLY_APP,
  BASE_PATH,
  INTERCHANGE_URL,
  DATA_DOG_RUM_APPLICATION,
  DATA_DOG_RUM_TOKEN,
  CAT_SERVICE_URL,
  GQL_PROXY_URL,
  WEB_LEADS_URL,
} = publicRuntimeConfig;

class AppraisalApp extends App<
  Record<string, unknown>,
  Record<string, unknown>,
  {
    isSignedIn: boolean;
    isSignedInLoaded: boolean;
  }
> {
  private readonly catSDK: CatSDK;
  private readonly analyticsHandler: AnalyticsHandler;
  private readonly commonHandler: CommonHandler;

  constructor(props: AppProps) {
    super(props);

    if (props.router.pageLoader) {
      // Support serving _next/data/ assets with basePath prefix
      const originalGetDataHref = props.router.pageLoader.getDataHref;
      props.router.pageLoader.getDataHref = function (params) {
        const r = originalGetDataHref.call(props.router.pageLoader, params);
        return r && r.startsWith('/_next/data') ? `${BASE_PATH}${r}` : r;
      };
    }

    this.analyticsHandler = new AnalyticsHandler();
    this.catSDK = new CatSDK({
      serviceBasePath: CAT_SERVICE_URL || '',
    });

    this.commonHandler = new CommonHandler(
      GQL_PROXY_URL || '',
      WEB_LEADS_URL || ''
    );

    this.state = {
      isSignedIn: false,
      isSignedInLoaded: false,
    };
  }

  checkSignInStatus = async (): Promise<void> => {
    const signInStatusResp = await client.signInStatus();

    if (isErrorResponse(signInStatusResp)) {
      this.setState((currentState) => ({
        ...currentState,
        isSignedIn: false,
        isSignedInLoaded: true,
      }));
      return;
    }

    this.setState((currentState) => ({
      ...currentState,
      isSignedIn:
        signInStatusResp &&
        signInStatusResp.data &&
        signInStatusResp.data.status === 'active',
      isSignedInLoaded: true,
    }));
  };

  componentDidMount(): void {
    smoothscroll.polyfill(); // needs access to the window
    if (DATA_DOG_RUM_APPLICATION) {
      datadogRum.init({
        applicationId: DATA_DOG_RUM_APPLICATION,
        clientToken: DATA_DOG_RUM_TOKEN,
        site: 'datadoghq.com',
        service: packageInfo.name,
        version: packageInfo.version,
        sessionSampleRate: 100,
        trackUserInteractions: true,
      });

      datadogRum.startSessionReplayRecording();
    }

    this.catSDK.initCatData().catch((e) => {
      console.error('Failed to initialize cat data', e);
    });
    this.commonHandler.check3rdPartyAuth();
    saveUTMParams();

    const vehicleVIN = this.props.router.query?.vehicle as string;

    if (vehicleVIN && this.props.pageProps.forcedSignInDueToPreviousAuth) {
      this.analyticsHandler.trackConditionalSignIn(vehicleVIN);
    }

    if (!this.props.pageProps.allowUnauthenticated) {
      this.checkSignInStatus().catch((e) => {
        console.error('Failed to check sign-in status', e);
      });
    }
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    const { isSignedIn, isSignedInLoaded } = this.state;
    const forcedEmail =
      typeof pageProps.initialEmail === 'string'
        ? pageProps.initialEmail
        : undefined;

    const component =
      pageProps.allowUnauthenticated || isSignedIn ? (
        <Component {...pageProps} />
      ) : (
        <LoggedOutDialog
          isLoading={!isSignedInLoaded}
          onSuccessfulLogin={this.checkSignInStatus}
          forcedEmail={forcedEmail}
        />
      );

    return (
      <>
        <GlobalStyle />
        <ABSmartlyProvider
          apiKey={ABSMARTLY_API_KEY}
          application={ABSMARTLY_APP}
          endpoint={`${INTERCHANGE_URL || ''}${ABSMARTLY_URL}`}
          environment={ABSMARTLY_ENV}
        >
          <AnalyticsHandlerContext.Provider value={this.analyticsHandler}>
            <CatSDKContext.Provider value={this.catSDK}>
              <RestrictedContext>
                <StyledComponentsThemeProvider theme={getVroomTheme()}>
                  <RecaptchaProvider>
                    <AppProvider>
                      {component}
                      <div id="modals-root" />
                    </AppProvider>
                  </RecaptchaProvider>
                </StyledComponentsThemeProvider>
              </RestrictedContext>
            </CatSDKContext.Provider>
          </AnalyticsHandlerContext.Provider>
        </ABSmartlyProvider>
      </>
    );
  }
}

export default AppraisalApp;
