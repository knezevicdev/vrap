import { AnalyticsHandler } from '@vroom-web/analytics-integration';
import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle, theme } from '../core/themes/Vroom';

export default class VroomApp extends App {
  componentDidMount() {
    new AnalyticsHandler().page('Landing - 2019 Jeep Wrangler');
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <>
        <>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </>
      </>
    );
  }
}
