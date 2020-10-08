import {
  identify as segmentIdentify,
  onAnalyticsReady as onSegmentAnalyticsReady,
  page as segmentPage,
  setAnonymousId as segmentSetAnonymousId,
  track as segmentTrack,
} from './segment';

declare global {
  interface Window {
    ga?: Function;
  }
}

interface Properties {
  category: string;
  label: string;
}

interface Experiment {
  id: string;
  assignedVariant: 0 | 1;
  optimizeId?: string;
}

interface RegisteredExperiment {
  id: string;
  variant: 0 | 1;
  optimizeId?: string;
  time: string;
}

enum VitParam {
  SOURCE = 'vit_source',
  MEDIUM = 'vit_medium',
  CAMPAIGN = 'vit_campaign',
  TERM = 'vit_term',
  CONTENT = 'vit_content',
  DEST = 'vit_dest',
}

type VitParams = { [key in VitParam]?: string };

class AnalyticsHandler {
  private static registeredExperimentsKey = 'registered_exp';
  private static registeredExperiments: RegisteredExperiment[] = [];
  private static optimizeExperimentsString?: string;

  private getVitParams(): VitParams {
    if (typeof window === 'undefined') {
      return {};
    }
    const urlSearchParams = new URLSearchParams(window.location.search);
    const source = urlSearchParams.get(VitParam.SOURCE);
    const medium = urlSearchParams.get(VitParam.MEDIUM);
    const campaign = urlSearchParams.get(VitParam.CAMPAIGN);
    const term = urlSearchParams.get(VitParam.TERM);
    const content = urlSearchParams.get(VitParam.CONTENT);
    const dest = urlSearchParams.get(VitParam.DEST);

    const vitParams: VitParams = {};
    if (source) {
      vitParams[VitParam.SOURCE] = source;
    }
    if (medium) {
      vitParams[VitParam.MEDIUM] = medium;
    }
    if (campaign) {
      vitParams[VitParam.CAMPAIGN] = campaign;
    }
    if (term) {
      vitParams[VitParam.TERM] = term;
    }
    if (content) {
      vitParams[VitParam.CONTENT] = content;
    }
    if (dest) {
      vitParams[VitParam.DEST] = dest;
    }
    return vitParams;
  }

  constructor() {
    if (typeof window !== 'undefined') {
      this.retrieveRegisteredExperiments();
      this.setOptimizeData();
    }
  }

  track(event: string, properties?: object): void {
    const vitParams = this.getVitParams();
    const fullProperties = {
      ...properties,
      ...vitParams,
      experimentCombination: AnalyticsHandler.optimizeExperimentsString,
    };
    segmentTrack(event, fullProperties);
  }

  setAnonymousId(anonymousId: string): void {
    segmentSetAnonymousId(anonymousId);
  }

  // TODO: depricate this in favor of using registerExperiment directly.
  setExperiments(experiments?: Experiment[]): void {
    if (experiments) {
      experiments.forEach((experiment) => {
        this.registerExperiment(experiment);
      });
    }
  }

  setOptimizeData(): void {
    AnalyticsHandler.optimizeExperimentsString = AnalyticsHandler.registeredExperiments
      .filter((experiment) => experiment.optimizeId)
      .map((experiment) => `${experiment.optimizeId}.${experiment.variant}`)
      .join('!');

    onSegmentAnalyticsReady(() => {
      try {
        if (typeof window.ga === 'undefined') {
          throw new Error('window.ga is undefined');
        }
        window.ga('set', 'exp', AnalyticsHandler.optimizeExperimentsString);
      } catch (e) {
        console.error(e);
      }
    });
  }

  storeRegisteredExperiments(): void {
    const registeredExperimentsString = JSON.stringify(
      AnalyticsHandler.registeredExperiments
    );
    localStorage.setItem(
      AnalyticsHandler.registeredExperimentsKey,
      registeredExperimentsString
    );
  }

  retrieveRegisteredExperiments(): void {
    const registeredExperimentsString = localStorage.getItem(
      AnalyticsHandler.registeredExperimentsKey
    );
    if (!registeredExperimentsString) {
      return;
    }
    const registeredExperiments = JSON.parse(
      registeredExperimentsString
    ) as RegisteredExperiment[];
    AnalyticsHandler.registeredExperiments = registeredExperiments;
  }

  registerExperiment(experiment: Experiment): void {
    const experimentIndex = AnalyticsHandler.registeredExperiments.findIndex(
      (re) => re.id === experiment.id
    );
    if (experimentIndex !== -1) {
      AnalyticsHandler.registeredExperiments.splice(experimentIndex, 1);
    }
    const registeredExperiment: RegisteredExperiment = {
      id: experiment.id,
      variant: experiment.assignedVariant,
      optimizeId: experiment.optimizeId,
      time: new Date().toISOString(),
    };
    AnalyticsHandler.registeredExperiments.push(registeredExperiment);
    this.storeRegisteredExperiments();
    this.setOptimizeData();
  }

  createAdditionalTracker(id: string, name: string): void {
    onSegmentAnalyticsReady(() => {
      if (typeof window.ga === 'undefined') {
        throw new Error('window.ga is undefined');
      }
      window.ga('create', id, 'auto', { name: name });
      window.ga(`${name}.send`, 'pageview');
      window.analytics.on('track', function (
        event: string,
        properties: object
      ) {
        if (typeof window.ga === 'undefined') {
          throw new Error('window.ga is undefined');
        }
        const prop = properties as Properties;
        window.ga(`${name}.send`, {
          hitType: 'event',
          eventCategory: prop.category || 'All',
          eventAction: event,
          eventLabel: prop.label || 'All',
        });
      });
    });
  }

  page(name: string, category?: string): void {
    const vitParams = this.getVitParams();
    const properties = {
      category,
      experimentCombination: AnalyticsHandler.optimizeExperimentsString,
      name,
      ...vitParams,
    };
    segmentPage(name, properties);
  }

  identify(traits: object, userId?: string): void {
    segmentIdentify(traits, userId);
  }
}

export default AnalyticsHandler;
