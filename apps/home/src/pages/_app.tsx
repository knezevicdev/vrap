import 'mobx-react/batchingForReactDom';

import { datadogLogs, LogsUserConfiguration } from '@datadog/browser-logs';
import { configure as configureMobx } from 'mobx';
import App from 'next/app';
import getConfig from 'next/config';
import Head from 'next/head';
import React from 'react';
import smoothscroll from 'smoothscroll-polyfill';

const { publicRuntimeConfig } = getConfig();

configureMobx({
  enforceActions: 'observed', // don't allow state modifications outside actions
});

class VroomApp extends App {
  componentDidMount(): void {
    smoothscroll.polyfill(); // needs access to the window
    if (publicRuntimeConfig.DATA_DOG_LOG_COLLECTION_TOKEN) {
      const init: LogsUserConfiguration = {
        clientToken: publicRuntimeConfig.DATA_DOG_LOG_COLLECTION_TOKEN,
        datacenter: 'us' as LogsUserConfiguration['datacenter'],
        forwardErrorsToLogs: true,
        sampleRate: 100,
        service: publicRuntimeConfig.NAME,
        silentMultipleInit: true,
        version: publicRuntimeConfig.VERSION,
      };
      const context = {
        service: publicRuntimeConfig.NAME,
        host: window.location.host,
        version: publicRuntimeConfig.VERSION,
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
