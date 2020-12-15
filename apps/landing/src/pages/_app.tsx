import { datadogRum } from '@datadog/browser-rum';
import { CatSDK } from '@vroom-web/cat-sdk';
import App from 'next/app';
import getConfig from 'next/config';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle, theme } from '../core/themes/Vroom';

const {
  publicRuntimeConfig: {
    DATA_DOG_RUM_APPLICATION,
    DATA_DOG_RUM_TOKEN,
    NAME,
    NODE_ENV,
    VERSION,
  },
} = getConfig();

const dev = NODE_ENV !== 'production';

export default class VroomApp extends App {
  componentDidMount(): void {
    if (DATA_DOG_RUM_APPLICATION) {
      datadogRum.init({
        applicationId: DATA_DOG_RUM_APPLICATION,
        clientToken: DATA_DOG_RUM_TOKEN,
        site: 'datadoghq.com',
        service: NAME,
        version: VERSION,
        sampleRate: 100,
        trackInteractions: true,
      });
    }

    const catSDK = new CatSDK({
      // Point to dev for local builds.
      serviceBasePath: dev ? 'https://dev.vroom.com' : undefined,
    });
    catSDK.initCatData();
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}
