import { datadogRum } from '@datadog/browser-rum';
import { Brand, ThemeProvider } from '@vroom-web/ui';
import App from 'next/app';
import getConfig from 'next/config';
import React from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';

import { GlobalStyle, theme } from '../core/themes/Vroom';

const { publicRuntimeConfig } = getConfig();

class VroomApp extends App {
  componentDidMount(): void {
    smoothscroll.polyfill(); // needs access to the window
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
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <>
        <GlobalStyle />
        <ThemeProvider brand={Brand.VROOM}>
          <StyledComponentsThemeProvider theme={theme}>
            <Component {...pageProps} />
          </StyledComponentsThemeProvider>
        </ThemeProvider>
      </>
    );
  }
}

export default VroomApp;
