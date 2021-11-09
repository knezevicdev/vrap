import 'firebase/analytics';
import 'firebase/remote-config';

import { datadogRum } from '@datadog/browser-rum';
import { IdProvider } from '@radix-ui/react-id';
import { ABSmartlyModel } from '@vroom-web/absmartly-integration';
import { CatSDK } from '@vroom-web/cat-sdk';
import { Status as NetworkingStatus } from '@vroom-web/networking';
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

import { GlobalStyle, theme } from '../core/themes/Vroom';

import AppStoreNetwork, { AppStoreNetworkContext } from 'src/context';
import { AnalyticsHandlerContext } from 'src/integrations/AnalyticHandlerContext';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { CatSDKContext } from 'src/integrations/CatSDKContext';
import ENVS from 'src/integrations/Envs';
import { RemoteConfigContext } from 'src/integrations/RemoteConfigContext';

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

class AppraisalApp extends App {
  private readonly remoteConfig: firebase.remoteConfig.RemoteConfig;
  private readonly catSDK: CatSDK;
  private readonly analyticsHandler: AnalyticsHandler;
  private readonly commonHandler: CommonHandler;
  appStore: AppStoreNetwork = new AppStoreNetwork();

  constructor(props: AppProps) {
    super(props);
    this.analyticsHandler = new AnalyticsHandler();
    const serviceBasePath = ENVS.NEXT_PUBLIC_INTERCHANGE_URL;
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
    this.commonHandler.check3rdPartyAuth();
    this.handleAbsmart();
  }

  handleAbsmart = (): void => {
    const { store } = this.appStore;
    const abSmartlyModel = new ABSmartlyModel({
      endpoint: publicRuntimeConfig.NEXT_PUBLIC_ABSMARTLY_URL,
      apiKey: publicRuntimeConfig.ABSMARTLY_API_KEY,
      environment: publicRuntimeConfig.ABSMARTLY_ENV,
      application: publicRuntimeConfig.ABSMARTLY_APP,
    });

    store.absmart.setABSmartlyModel(abSmartlyModel);
    const checkAnalytics = window.setTimeout(() => {
      store.absmart.abSmartlyModel?.setStatus(NetworkingStatus.ERROR);
      store.absmart.setLoading(false);
    }, 3500);

    this.analyticsHandler.onAnalyticsReady(async () => {
      clearTimeout(checkAnalytics);
      const sessionId = this.analyticsHandler.getAnonymousId();
      if (sessionId) {
        await abSmartlyModel?.initABSmartly(sessionId);
        const offerFaceliftTest = abSmartlyModel?.inExperiment(
          'ac-appraisal-offer-facelift'
        );
        const stepperAbTest = abSmartlyModel?.inExperiment(
          'ac-appraisal-stepper-verification'
        );
        const faceliftAbTest = abSmartlyModel?.inExperiment(
          'ac-payment-facelift'
        );
        const agreementTest = abSmartlyModel?.inExperiment(
          'ac-appraisal-review-agreement'
        );
        const progressiveAbTest = abSmartlyModel?.inExperiment(
          'vadd-progressive-ad-suyc'
        );
        const paymentRequired = abSmartlyModel?.inExperiment(
          'ac-payment-required'
        );
        store.absmart.setABSmartTest(stepperAbTest);
        store.absmart.setFaceliftAbTest(faceliftAbTest);
        store.absmart.setOfferFacelift(offerFaceliftTest);
        store.absmart.setAgreementAbtest(agreementTest);
        store.absmart.setProgressiveTest(progressiveAbTest);
        store.absmart.setPaymentRequired(paymentRequired);
        store.absmart.setLoading(false);
      } else {
        abSmartlyModel?.setStatus(NetworkingStatus.ERROR);
        store.absmart.setLoading(false);
      }
    });
  };

  render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <>
        <GlobalStyle />
        <AnalyticsHandlerContext.Provider value={this.analyticsHandler}>
          <CatSDKContext.Provider value={this.catSDK}>
            <RemoteConfigContext.Provider value={this.remoteConfig}>
              <IdProvider>
                <ThemeProvider brand={Brand.VROOM}>
                  <StyledComponentsThemeProvider theme={theme}>
                    <AppStoreNetworkContext.Provider value={this.appStore}>
                      <Component {...pageProps} />
                    </AppStoreNetworkContext.Provider>
                  </StyledComponentsThemeProvider>
                </ThemeProvider>
              </IdProvider>
            </RemoteConfigContext.Provider>
          </CatSDKContext.Provider>
        </AnalyticsHandlerContext.Provider>
      </>
    );
  }
}

export default AppraisalApp;
