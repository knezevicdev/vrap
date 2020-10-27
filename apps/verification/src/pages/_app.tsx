import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle, theme } from '../core/themes/Vroom';

class VroomApp extends App {
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

export default VroomApp;
