import 'firebase/analytics';
import 'firebase/remote-config';
import 'src/global.css';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css';

import { datadogRum } from '@datadog/browser-rum';
import { ABSmartlyProvider } from '@vroom-web/analytics-integration';
import { CatSDK } from '@vroom-web/cat-sdk';
import { isErrorResponse } from '@vroom-web/networking';
import { CommonHandler } from '@vroom-web/shared-components';
import { GlobalStyle } from '@vroom-web/ui-lib';
import firebase from 'firebase/app';
import { configure as configureMobx } from 'mobx';
import App, { AppProps } from 'next/app';
import getConfig from 'next/config';
import packageInfo from 'package.json';
import React from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';

import LoggedOutDialog from '../components/LoggedOutDialog';
import { theme } from '../core/themes/Vroom';
import {
  defaultRestrictedContextValue,
  getRestrictedAppraisalContext,
  RestrictedAppraisalContext,
  RestrictedAppraisalContextType,
} from '../integrations/RestrictedAppraisalContext';
import client from '../networking/client';

import AppProvider from 'src/context/AppContext';
import { AnalyticsHandlerContext } from 'src/integrations/AnalyticHandlerContext';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { CatSDKContext } from 'src/integrations/CatSDKContext';
import { RemoteConfigContext } from 'src/integrations/RemoteConfigContext';
import { saveUTMParams } from 'src/networking/utils';

const firebaseConfig = {
  apiKey: 'AIzaSyAf2yVhnnxthUA5C4RqIqeDkIhk74EBkAA',
  authDomain: 'vroom-web.firebaseapp.com',
  projectId: 'vroom-web',
  storageBucket: 'vroom-web.appspot.com',
  messagingSenderId: '972016380498',
  appId: '1:972016380498:web:bcef1f06e28ad2911f8d8b',
  measurementId: 'G-RKV8HM65P9',
};

configureMobx({
  enforceActions: 'observed', // don't allow state modifications outside actions
});

const { publicRuntimeConfig } = getConfig();

const {
  NEXT_PUBLIC_ABSMARTLY_URL,
  ABSMARTLY_API_KEY,
  ABSMARTLY_ENV,
  ABSMARTLY_APP,
  NEXT_PUBLIC_BASE_PATH,
  NEXT_PUBLIC_INTERCHANGE_URL,
  DATA_DOG_RUM_APPLICATION,
  DATA_DOG_RUM_TOKEN,
  NEXT_PUBLIC_CAT_SERVICE_URL,
  GQL_PROXY_URL,
  NEXT_PUBLIC_WEB_LEADS_URL,
} = publicRuntimeConfig;

class AppraisalApp extends App<
  Record<string, unknown>,
  Record<string, unknown>,
  {
    isSignedIn: boolean;
    isSignedInLoaded: boolean;
    restrictedContextValue: RestrictedAppraisalContextType;
    restrictedContextValueLoaded: boolean;
  }
> {
  private readonly remoteConfig: firebase.remoteConfig.RemoteConfig;
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
        return r && r.startsWith('/_next/data')
          ? `${NEXT_PUBLIC_BASE_PATH}${r}`
          : r;
      };
    }

    this.analyticsHandler = new AnalyticsHandler();
    this.catSDK = new CatSDK({
      serviceBasePath: NEXT_PUBLIC_CAT_SERVICE_URL || '',
    });

    this.commonHandler = new CommonHandler(
      GQL_PROXY_URL || '',
      NEXT_PUBLIC_WEB_LEADS_URL || ''
    );

    if (firebase.apps.length == 0) {
      firebase.initializeApp(firebaseConfig);
    }

    this.remoteConfig =
      typeof window !== 'undefined'
        ? firebase.remoteConfig()
        : ({} as firebase.remoteConfig.RemoteConfig);

    if (typeof window !== 'undefined') {
      this.remoteConfig.settings.minimumFetchIntervalMillis = 300000;
    }

    this.state = {
      isSignedIn: false,
      isSignedInLoaded: false,
      restrictedContextValue: defaultRestrictedContextValue,
      restrictedContextValueLoaded: false,
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

  fetchRestrictedAppraisalContext = async () => {
    const restrictedContextValue = await getRestrictedAppraisalContext(
      publicRuntimeConfig.FIREBASE_CONFIG
    );

    this.setState((currentState) => ({
      ...currentState,
      restrictedContextValue,
      restrictedContextValueLoaded: true,
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
        sampleRate: 100,
        trackInteractions: true,
      });
    }

    this.catSDK.initCatData();
    this.commonHandler.check3rdPartyAuth();
    saveUTMParams();
    this.fetchRestrictedAppraisalContext();

    if (!this.props.pageProps.allowUnauthenticated) {
      this.checkSignInStatus();
    }
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    const { isSignedIn, isSignedInLoaded } = this.state;

    const component =
      pageProps.allowUnauthenticated || isSignedIn ? (
        <Component {...pageProps} />
      ) : (
        <LoggedOutDialog isLoading={!isSignedInLoaded} />
      );

    return (
      <>
        <GlobalStyle baseUrl={publicRuntimeConfig.BASE_PATH} />
        <ABSmartlyProvider
          apiKey={ABSMARTLY_API_KEY}
          application={ABSMARTLY_APP}
          endpoint={`${
            NEXT_PUBLIC_INTERCHANGE_URL || ''
          }${NEXT_PUBLIC_ABSMARTLY_URL}`}
          environment={ABSMARTLY_ENV}
        >
          <AnalyticsHandlerContext.Provider value={this.analyticsHandler}>
            <CatSDKContext.Provider value={this.catSDK}>
              <RemoteConfigContext.Provider value={this.remoteConfig}>
                <RestrictedAppraisalContext.Provider
                  value={{
                    value: this.state.restrictedContextValue,
                    loaded: this.state.restrictedContextValueLoaded,
                  }}
                >
                  <StyledComponentsThemeProvider theme={theme}>
                    <AppProvider>{component}</AppProvider>
                  </StyledComponentsThemeProvider>
                </RestrictedAppraisalContext.Provider>
              </RemoteConfigContext.Provider>
            </CatSDKContext.Provider>
          </AnalyticsHandlerContext.Provider>
        </ABSmartlyProvider>
      </>
    );
  }
}

export default AppraisalApp;
