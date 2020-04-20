import 'mobx-react/batchingForReactDom';

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { configure as configureMobx } from 'mobx';
import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import smoothscroll from 'smoothscroll-polyfill';

import theme from 'src/ui/theme';

configureMobx({
  enforceActions: 'observed', // don't allow state modifications outside actions
});

class VroomApp extends App {
  componentDidMount(): void {
    smoothscroll.polyfill(); // needs access to the window
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>Vroom</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}

export default VroomApp;
