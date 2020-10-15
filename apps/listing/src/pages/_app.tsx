import 'mobx-react/batchingForReactDom';

import { datadogRum } from '@datadog/browser-rum';
import { CatSDK } from '@vroom-web/cat-sdk';
import { Brand } from '@vroom-web/ui';
import { configure as configureMobx } from 'mobx';
import App from 'next/app';
import getConfig from 'next/config';
import Head from 'next/head';
import Router from 'next/router';
import React from 'react';
import smoothscroll from 'smoothscroll-polyfill';

import {
  analyticsHandler,
  santanderGA,
  santanderTrackerName,
} from '../integrations/AnalyticsHandler';

configureMobx({
  enforceActions: 'observed', // don't allow state modifications outside actions
});

const { publicRuntimeConfig } = getConfig();

class VroomApp extends App {
  componentDidMount(): void {
    if (publicRuntimeConfig.DATA_DOG_RUM_APPLICATION) {
      datadogRum.init({
        applicationId: publicRuntimeConfig.DATA_DOG_RUM_APPLICATION,
        clientToken: publicRuntimeConfig.DATA_DOG_RUM_TOKEN,
        site: 'datadoghq.com',
        service: publicRuntimeConfig.NAME,
        version: publicRuntimeConfig.VERSION,
        sampleRate: 100,
        trackInteractions: true,
      });
    }

    smoothscroll.polyfill(); // needs access to the window

    const dev = publicRuntimeConfig.NODE_ENV !== 'production';
    const catSDK = new CatSDK({
      // Point to dev for local builds.
      serviceBasePath: dev ? 'https://dev.vroom.com' : undefined,
    });

    catSDK.initCatData();

    const {
      pageProps: { brand },
    } = this.props;

    if (brand === Brand.SANTANDER) {
      analyticsHandler.createAdditionalTracker(
        santanderGA,
        santanderTrackerName
      );
      Router.events.on('routeChangeComplete', (url) => {
        analyticsHandler.trackSantanderPageViews(url);
      });
    }
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}

export default VroomApp;
