import { datadogRum } from '@datadog/browser-rum';
import {
  ErrorResponse,
  isAccessDeniedErrorResponse,
  ResponseErrorInterceptor,
} from '@vroom-web/networking';
import { configure as configureMobx } from 'mobx';
import App from 'next/app';
import getConfig from 'next/config';

import client from 'src/networking/client';

configureMobx({
  enforceActions: 'observed', // don't allow state modifications outside actions
  useProxies: 'ifavailable',
});

const { publicRuntimeConfig } = getConfig();

class VroomApp extends App {
  componentDidMount(): void {
    if (publicRuntimeConfig.DATA_DOG_RUM_APPLICATION) {
      datadogRum.init({
        applicationId: publicRuntimeConfig.DATA_DOG_RUM_APPLICATION,
        clientToken: publicRuntimeConfig.DATA_DOG_RUM_TOKEN,
        env: publicRuntimeConfig.NODE_ENV,
        site: 'datadoghq.com',
        service: publicRuntimeConfig.NAME,
        version: publicRuntimeConfig.VERSION,
        sampleRate: 100,
        trackInteractions: true,
      });
    }

    const errorInterceptor: ResponseErrorInterceptor = async (
      errorResponse: ErrorResponse
    ) => {
      if (isAccessDeniedErrorResponse(errorResponse)) {
        // TODO: open a login dialog instead of redirecting.
        window.location.href = `/account/login?redirect=${window.location.pathname}`;
      }
    };
    client.addResponseInterceptor(errorInterceptor);
  }
}

export default VroomApp;
