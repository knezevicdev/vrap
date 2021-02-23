import { datadogRum } from '@datadog/browser-rum';
import { CatSDK } from '@vroom-web/cat-sdk';
import {
  ErrorResponse,
  isAccessDeniedErrorResponse,
  ResponseErrorInterceptor,
} from '@vroom-web/networking';
import {
  getVroomTheme,
  GlobalStyle,
} from '@vroom-web/temp-ui-alias-for-checkout';
import { Brand, ThemeProvider } from '@vroom-web/ui';
import { configure as configureMobx } from 'mobx';
import App from 'next/app';
import getConfig from 'next/config';
import React from 'react';
import Modal from 'react-modal';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import DealValidatorModal from 'src/modules/dealValidator';
import client from 'src/networking/client';

configureMobx({
  enforceActions: 'observed', // don't allow state modifications outside actions
  useProxies: 'ifavailable',
  isolateGlobalState: true,
});

const { publicRuntimeConfig } = getConfig();
Modal.setAppElement('#__next');
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
        // window.location.href = `/account/login?redirect=${window.location.pathname}`;
      }
    };
    client.addResponseInterceptor(errorInterceptor);
    const dev = publicRuntimeConfig.NODE_ENV !== 'production';
    const catSDK = new CatSDK({
      // Point to dev for local builds.
      serviceBasePath: dev ? 'https://dev.vroom.com' : undefined,
    });
    catSDK.initCatData();
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    const theme = getVroomTheme();
    return (
      <>
        <GlobalStyle baseUrl={publicRuntimeConfig.BASE_PATH} />
        <ThemeProvider brand={Brand.VROOM}>
          <StyledThemeProvider theme={theme}>
            <DealValidatorModal />
            <Component {...pageProps} />
          </StyledThemeProvider>
        </ThemeProvider>
      </>
    );
  }
}

export default VroomApp;
