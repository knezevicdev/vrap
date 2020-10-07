import { CatSDK } from '@vroom-web/cat-sdk';
import App from 'next/app';
import getConfig from 'next/config';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle, theme } from '../core/themes/Vroom';

const {
  publicRuntimeConfig: { NODE_ENV },
} = getConfig();

const dev = NODE_ENV !== 'production';

export default class VroomApp extends App {
  componentDidMount(): void {
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
