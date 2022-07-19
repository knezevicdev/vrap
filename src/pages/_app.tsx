import 'firebase/analytics';
import 'firebase/remote-config';
import 'src/global.css';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css';

import { datadogRum } from '@datadog/browser-rum';
import { ABSmartlyProvider } from '@vroom-web/analytics-integration';
import { CatSDK } from '@vroom-web/cat-sdk';
import { CommonHandler } from '@vroom-web/shared-components';
import { Brand, ThemeProvider } from '@vroom-web/ui';
import firebase from 'firebase/app';
import { configure as configureMobx } from 'mobx';
import App, { AppProps } from 'next/app';
import getConfig from 'next/config';
import { name, version } from 'package.json';
import React from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';

import { theme } from '../core/themes/Vroom';

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
} = publicRuntimeConfig;

const NEXT_PUBLIC_INTERCHANGE_URL =
  publicRuntimeConfig.NEXT_PUBLIC_INTERCHANGE_URL;
const DATA_DOG_RUM_APPLICATION = publicRuntimeConfig.DATA_DOG_RUM_APPLICATION;
const DATA_DOG_RUM_TOKEN = publicRuntimeConfig.DATA_DOG_RUM_TOKEN;

class AppraisalApp extends App {
  private readonly remoteConfig: firebase.remoteConfig.RemoteConfig;
  private readonly catSDK: CatSDK;
  private readonly analyticsHandler: AnalyticsHandler;
  private readonly commonHandler: CommonHandler;

  constructor(props: AppProps) {
    super(props);

    if (props.router.pageLoader) {
      // Support serving _next/data/ assets with basePath prefix
      const originalGetDataHref = props.router.pageLoader.getDataHref;
      props.router.pageLoader.getDataHref = function (...args: any[]) {
        const r = originalGetDataHref.call(props.router.pageLoader, ...args);
        return r && r.startsWith('/_next/data')
          ? `${NEXT_PUBLIC_BASE_PATH}${r}`
          : r;
      };
    }

    this.analyticsHandler = new AnalyticsHandler();
    const serviceBasePath = NEXT_PUBLIC_INTERCHANGE_URL;
    this.catSDK = new CatSDK({
      serviceBasePath: publicRuntimeConfig.NEXT_PUBLIC_CAT_SERVICE_URL || '',
    });

    const gqlUrl = serviceBasePath !== '' ? `${serviceBasePath}/gql` : '';
    const webLeadUrl =
      serviceBasePath !== ''
        ? `${serviceBasePath}/api/weblead/attribution`
        : '';
    this.commonHandler = new CommonHandler(gqlUrl, webLeadUrl);

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
  }

  componentDidMount(): void {
    smoothscroll.polyfill(); // needs access to the window
    if (DATA_DOG_RUM_APPLICATION) {
      datadogRum.init({
        applicationId: DATA_DOG_RUM_APPLICATION,
        clientToken: DATA_DOG_RUM_TOKEN,
        site: 'datadoghq.com',
        service: name,
        version: version,
        sampleRate: 100,
        trackInteractions: true,
      });
    }

    this.catSDK.initCatData();
    this.commonHandler.check3rdPartyAuth();
    saveUTMParams();
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <>
        <ABSmartlyProvider
          apiKey={ABSMARTLY_API_KEY}
          application={ABSMARTLY_APP}
          endpoint={NEXT_PUBLIC_ABSMARTLY_URL}
          environment={ABSMARTLY_ENV}
        >
          <AnalyticsHandlerContext.Provider value={this.analyticsHandler}>
            <CatSDKContext.Provider value={this.catSDK}>
              <RemoteConfigContext.Provider value={this.remoteConfig}>
                <ThemeProvider brand={Brand.VROOM}>
                  <StyledComponentsThemeProvider theme={theme}>
                    <AppProvider>
                      <Component {...pageProps} />
                    </AppProvider>
                  </StyledComponentsThemeProvider>
                </ThemeProvider>
              </RemoteConfigContext.Provider>
            </CatSDKContext.Provider>
          </AnalyticsHandlerContext.Provider>
        </ABSmartlyProvider>
      </>
    );
  }
}

export default AppraisalApp;
