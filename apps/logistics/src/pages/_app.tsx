import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { configure as configureMobx } from 'mobx';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import theme from 'src/theme';

configureMobx({
  enforceActions: 'observed', // don't allow state modifications outside actions
});

const LogisticsApp = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <title>Vroom</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default LogisticsApp;
