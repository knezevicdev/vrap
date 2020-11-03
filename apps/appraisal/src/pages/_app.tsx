import { datadogRum } from '@datadog/browser-rum';
import { Brand, ThemeProvider } from '@vroom-web/ui';
import App from 'next/app';
import { name, version } from 'package.json';
import React from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';

import ENVS from 'src/integrations/Envs';
import { GlobalStyle, theme } from '../core/themes/Vroom';

class VroomApp extends App {
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
