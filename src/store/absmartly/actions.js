import absmartly from '@absmartly/javascript-sdk';
import qs from 'qs';
import { globalConfig } from '@app/lib/globalConfig';
import { SET_CONTEXT } from './types';

function getOverrides() {
  const query = qs.parse(window.location.search, { ignoreQueryPrefix: true });

  const overrides = Object.entries(query)
    .filter(([key]) => key.startsWith('experiment-'))
    .reduce((acc, [key, value]) => {
      return {
        ...acc,
        [key.replace('experiment-', '')]: Number(value)
      };
    }, {});

  return overrides;
}

export function initAbsmartly() {
  return async dispatch => {
    const sdk = new absmartly.SDK({
      endpoint: globalConfig.ABSMARTLY_ENDPOINT,
      apiKey: globalConfig.ABSMARTLY_API_KEY,
      environment: globalConfig.ABSMARTLY_ENV,
      application: globalConfig.ABSMARTLY_APP
    });

    const anonymousId =
      window.analytics && window.analytics.user
        ? window.analytics.user().anonymousId()
        : '';

    const request = {
      units: {
        anonymous_id: anonymousId
      }
    };

    try {
      const context = sdk.createContext(request);
      context.attribute('user_agent', navigator.userAgent);
      context.overrides(getOverrides());

      await context.ready();

      dispatch({
        type: SET_CONTEXT,
        context
      });
    } catch {
      dispatch({
        type: SET_CONTEXT,
        context: null
      });
    }
  };
}
