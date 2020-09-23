import App from 'next/app';
import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import CalibreRegular from '../fonts/Vroom/Calibre-Regular.woff2';
import CalibreSemibold from '../fonts/Vroom/Calibre-Semibold.woff2';
import VroomSans from '../fonts/Vroom/Vroom-Sans.woff2';

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
    src: url(${CalibreRegular}) format('woff2');
  }
  @font-face {
    font-family: Calibre;
    font-weight: 600;
    src: url(${CalibreSemibold}) format('woff2');
  }
  @font-face {
    font-family: Vroom Sans;
    font-weight: normal;
    src: url(${VroomSans}) format('woff2');
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
