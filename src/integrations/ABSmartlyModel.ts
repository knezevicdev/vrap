import absmartly from '@absmartly/javascript-sdk';
import { Status } from '@vroom-web/networking';
import { action, makeObservable, observable } from 'mobx';
import getConfig from 'next/config';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

const { publicRuntimeConfig } = getConfig();

export interface ABSmartlyExperiments {
  [key: string]: boolean;
}

interface ABSmartlyExperimentOverrides {
  [key: string]: number;
}

class Model {
  private analyticsHandler: AnalyticsHandler;
  private experiments: string[] = ['ac-payment-facelift'];

  abSmartlyExperiments: ABSmartlyExperiments = {};

  status: Status = Status.INITIAL;

  constructor() {
    this.analyticsHandler = new AnalyticsHandler();
    makeObservable(this, {
      abSmartlyExperiments: observable,
      status: observable,
      setABSmartlyExperiments: action,
      setStatus: action,
    });
  }

  setABSmartlyExperiments(ABSmartlyExperiments: ABSmartlyExperiments): void {
    this.abSmartlyExperiments = ABSmartlyExperiments;
  }

  setStatus(status: Status): void {
    this.status = status;
  }

  async getABSmartlyTests(): Promise<void> {
    this.setStatus(Status.LOADING);
    const anonymousId = this.analyticsHandler.getAnonymousId();
    const abSmartlySdk = new absmartly.SDK({
      endpoint: publicRuntimeConfig.NEXT_PUBLIC_ABSMARTLY_URL,
      apiKey: publicRuntimeConfig.ABSMARTLY_API_KEY,
      environment: publicRuntimeConfig.ABSMARTLY_ENV,
      application: publicRuntimeConfig.ABSMARTLY_APP,
    });
    const request = {
      units: {
        anonymous_id: anonymousId,
      },
    };
    const context = abSmartlySdk.createContext(request);
    context.attribute('user_agent', navigator.userAgent);
    try {
      await context.ready();

      const experimentsData: ABSmartlyExperiments = {};
      const urlParams = new URLSearchParams(window.location.search);
      const experimentOverrides = this.experiments.reduce(
        (overrides: ABSmartlyExperimentOverrides, experimentId: string) => {
          const experimentQueryKey = `experiment-${experimentId}`;
          const queryValue = urlParams.get(experimentQueryKey) || '';
          const numValue = parseInt(queryValue, 10);
          if (queryValue) {
            return {
              ...overrides,
              [experimentId]: numValue,
            };
          }
          return overrides;
        },
        {}
      );
      context.overrides(experimentOverrides);
      for (const experimentId of this.experiments) {
        if (context.treatment(experimentId)) {
          experimentsData[experimentId] = true;
        } else {
          experimentsData[experimentId] = false;
        }
      }

      this.setABSmartlyExperiments(experimentsData);
      this.setStatus(Status.SUCCESS);
    } catch (error) {
      console.error(JSON.stringify(error));
      this.setStatus(Status.ERROR);
      return;
    }
  }
}

export default Model;
