import 'mobx-react/batchingForReactDom';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'src/modules/inventory/Vroom/components/Gallery/index.css';

import { datadogLogs, LogsUserConfiguration } from '@datadog/browser-logs';
import { configure as configureMobx } from 'mobx';
import App from 'next/app';
import getConfig from 'next/config';
import Head from 'next/head';
import React from 'react';
import smoothscroll from 'smoothscroll-polyfill';

configureMobx({
  enforceActions: 'observed', // don't allow state modifications outside actions
});

const { publicRuntimeConfig } = getConfig();

class VroomApp extends App {
  componentDidMount(): void {
    const {
      DATA_DOG_LOG_COLLECTION_TOKEN,

      NAME,

      VERSION,
    } = publicRuntimeConfig;

    if (DATA_DOG_LOG_COLLECTION_TOKEN) {
      const init: LogsUserConfiguration = {
        clientToken: DATA_DOG_LOG_COLLECTION_TOKEN,
        datacenter: 'us' as LogsUserConfiguration['datacenter'],
        forwardErrorsToLogs: true,
        sampleRate: 100,
        service: NAME,
        silentMultipleInit: true,
        version: VERSION,
      };
      const context = {
        service: NAME,
        host: window.location.host,
        version: VERSION,
      };
      datadogLogs.init(init);
      datadogLogs.setLoggerGlobalContext(context);
    }

    smoothscroll.polyfill(); // needs access to the window
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
