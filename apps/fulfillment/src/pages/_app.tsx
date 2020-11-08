import { ThemeProvider } from '@vroom-web/ui';
import { configure as configureMobx } from 'mobx';
import App from 'next/app';
import Head from 'next/head';
import React from 'react';

configureMobx({
  enforceActions: 'observed', // don't allow state modifications outside actions
});

class VroomApp extends App {
  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>Vroom</title>
        </Head>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}

export default VroomApp;
