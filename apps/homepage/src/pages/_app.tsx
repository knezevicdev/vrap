import 'mobx-react/batchingForReactDom';

import { datadogLogs, LogsUserConfiguration } from '@datadog/browser-logs';
import { ThemeProvider } from '@vroom-web/ui';
import { configure as configureMobx } from 'mobx';
import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import smoothscroll from 'smoothscroll-polyfill';

import globalEnv from 'src/globalEnv';

configureMobx({
  enforceActions: 'observed', // don't allow state modifications outside actions
});

class VroomApp extends App {
  componentDidMount(): void {
    smoothscroll.polyfill(); // needs access to the window
    if (globalEnv.DATA_DOG_LOG_COLLECTION_TOKEN) {
      const init: LogsUserConfiguration = {
        clientToken: globalEnv.DATA_DOG_LOG_COLLECTION_TOKEN,
        datacenter: 'us' as LogsUserConfiguration['datacenter'],
        forwardErrorsToLogs: true,
        sampleRate: 100,
        service: globalEnv.NAME,
        silentMultipleInit: true,
        version: globalEnv.VERSION,
      };
      const context = {
        service: globalEnv.NAME,
        host: window.location.host,
        version: globalEnv.VERSION,
      };
      datadogLogs.init(init);
      datadogLogs.setLoggerGlobalContext(context);
    }
  }

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
