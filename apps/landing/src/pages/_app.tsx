import App from 'next/app';
import getConfig from 'next/config';
import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const {
  publicRuntimeConfig: { BASE_PATH },
} = getConfig();

interface ThemeProps {
  typography: {
    family: {
      hero: string;
      title: string;
      body: string;
    };
    color: string;
  };
}

const theme: ThemeProps = {
  typography: {
    family: {
      hero: 'Vroom Sans',
      title: 'Calibre',
      body: 'Calibre',
    },
    color: '#041022',
  },
};

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Calibre;
    font-weight: normal;
    src: url(${BASE_PATH}/fonts/Vroom/Calibre-Regular.woff2) format('woff2');
    font-display: swap;
  }
  @font-face {
    font-family: Calibre;
    font-weight: 600;
    src: url(${BASE_PATH}/fonts/Vroom/Calibre-Semibold.woff2) format('woff2');
    font-display: swap;
  }
  @font-face {
    font-family: Vroom Sans;
    font-weight: normal;
    src: url(${BASE_PATH}/fonts/Vroom/Vroom-Sans.woff2) format('woff2');
    font-display: swap;
  }
`;

export default class VroomApp extends App {
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
