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
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <title>Vroom</title>
        </Head>
        {/* <ThemeProvider> */}
        <Component {...pageProps} />
        {/* </ThemeProvider> */}
      </>
    );
  }
}

export default VroomApp;
