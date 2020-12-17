import { datadogRum } from '@datadog/browser-rum';
import {
  ErrorResponse,
  isAccessDeniedErrorResponse,
  ResponseErrorInterceptor,
} from '@vroom-web/networking';
import { Brand, ThemeProvider } from '@vroom-web/ui';
import { configure as configureMobx } from 'mobx';
import App from 'next/app';
import getConfig from 'next/config';
import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { getVroomTheme, GlobalStyle } from 'vroom-ui';

import client from 'src/networking/client';

configureMobx({
  enforceActions: 'observed', // don't allow state modifications outside actions
  useProxies: 'ifavailable',
  isolateGlobalState: true,
});

const { publicRuntimeConfig } = getConfig();

class VroomApp extends App {
  componentDidMount(): void {
    if (publicRuntimeConfig.DATA_DOG_RUM_APPLICATION) {
      datadogRum.init({
        applicationId: publicRuntimeConfig.DATA_DOG_RUM_APPLICATION,
        clientToken: publicRuntimeConfig.DATA_DOG_RUM_TOKEN,
        env: publicRuntimeConfig.NODE_ENV,
        site: 'datadoghq.com',
        service: publicRuntimeConfig.NAME,
        version: publicRuntimeConfig.VERSION,
        sampleRate: 100,
        trackInteractions: true,
      });
    }

    const errorInterceptor: ResponseErrorInterceptor = async (
      errorResponse: ErrorResponse
    ) => {
      if (isAccessDeniedErrorResponse(errorResponse)) {
        // TODO: open a login dialog instead of redirecting.
        window.location.href = `/account/login?redirect=${window.location.pathname}`;
      }
    };
    client.addResponseInterceptor(errorInterceptor);
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    const theme = getVroomTheme();

    return (
      <>
        <GlobalStyle />
        <ThemeProvider brand={Brand.VROOM}>
          <StyledThemeProvider theme={theme}>
            <Component {...pageProps} />
          </StyledThemeProvider>
        </ThemeProvider>
      </>
    );
  }
}

export default VroomApp;
