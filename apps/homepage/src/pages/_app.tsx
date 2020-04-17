import 'react-image-gallery/styles/css/image-gallery.css';
import 'src/modules/inventory/components/Gallery/index.css';

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

class MyApp extends App {
  componentDidMount(): void {
    smoothscroll.polyfill(); // needs access to the window
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>Rocket Auto</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}

export default MyApp;