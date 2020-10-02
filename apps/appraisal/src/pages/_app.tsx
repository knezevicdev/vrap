import App from 'next/app';
import Head from 'next/head';
import React from 'react';

class VroomApp extends App {
  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>Your Vroom Price</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}

export default VroomApp;
