import 'firebase/analytics';
import 'firebase/remote-config';

import { datadogRum } from '@datadog/browser-rum';
import { CatSDK } from '@vroom-web/cat-sdk';
import { Client } from '@vroom-web/networking';
import { Brand, ThemeProvider } from '@vroom-web/ui';
import firebase from 'firebase/app';
import { configure as configureMobx } from 'mobx';
import App, { AppProps } from 'next/app';
import { name, version } from 'package.json';
import React from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';

import { GlobalStyle, theme } from '../core/themes/Vroom';

import { AnalyticsHandlerContext } from 'src/integrations/AnalyticHandlerContext';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { CatSDKContext } from 'src/integrations/CatSDKContext';
import ENVS from 'src/integrations/Envs';
import { RemoteConfigContext } from 'src/integrations/RemoteConfigContext';
import { ClientContext } from 'src/networking/ClientContext';

const firebaseConfig = {
  apiKey: ENVS.NEXT_PUBLIC_FIREBASE_API,
  authDomain: 'vroom-web.firebaseapp.com',
  projectId: 'vroom-web',
  storageBucket: 'vroom-web.appspot.com',
  messagingSenderId: ENVS.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: ENVS.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: ENVS.NEXT_PUBLIC_MEASUREMENT_ID,
};

configureMobx({
  enforceActions: 'observed', // don't allow state modifications outside actions
});

class AppraisalApp extends App {
  private readonly remoteConfig: firebase.remoteConfig.RemoteConfig;
  private readonly catSDK: CatSDK;
  private readonly client: Client;
  private readonly analyticsHandler: AnalyticsHandler;

  constructor(props: AppProps) {
    super(props);
    this.analyticsHandler = new AnalyticsHandler();
    const serviceBasePath = ENVS.NEXT_PUBLIC_INTERCHANGE_URL;
    this.catSDK = new CatSDK({ serviceBasePath });

    const gqlUrl = serviceBasePath !== '' ? `${serviceBasePath}/gql` : '';
    this.client = new Client(gqlUrl, { interchangeUrl: serviceBasePath });

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
    if (ENVS.DATA_DOG_RUM_APPLICATION) {
      datadogRum.init({
        applicationId: ENVS.DATA_DOG_RUM_APPLICATION,
        clientToken: ENVS.DATA_DOG_RUM_TOKEN,
        site: 'datadoghq.com',
        service: name,
        version: version,
        sampleRate: 100,
        trackInteractions: true,
      });
    }

    this.catSDK.initCatData();
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <>
        <GlobalStyle />
        <ClientContext.Provider value={this.client}>
          <AnalyticsHandlerContext.Provider value={this.analyticsHandler}>
            <CatSDKContext.Provider value={this.catSDK}>
              <RemoteConfigContext.Provider value={this.remoteConfig}>
                <ThemeProvider brand={Brand.VROOM}>
                  <StyledComponentsThemeProvider theme={theme}>
                    <Component {...pageProps} />
                  </StyledComponentsThemeProvider>
                </ThemeProvider>
              </RemoteConfigContext.Provider>
            </CatSDKContext.Provider>
          </AnalyticsHandlerContext.Provider>
        </ClientContext.Provider>
      </>
    );
  }
}

export default AppraisalApp;
