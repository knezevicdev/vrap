import 'mobx-react/batchingForReactDom';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'src/modules/inventory/Vroom/components/Gallery/index.css';
import 'src/modules/inventory/Santader/components/Gallery/index.css';

import { configure as configureMobx } from 'mobx';
import App from 'next/app';
import React from 'react';
import smoothscroll from 'smoothscroll-polyfill';

configureMobx({
  enforceActions: 'observed', // don't allow state modifications outside actions
});

class VroomApp extends App {
  componentDidMount(): void {
    smoothscroll.polyfill(); // needs access to the window
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default VroomApp;
