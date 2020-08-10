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
  assignedVariant: 0 | 1;
  optimizeId?: string;
}

class AnalyticsHandler {
  private static optimizeExperimentsString?: string;

  track(event: string, properties?: object): void {
    const propertiesWithExperimentCombination = {
      ...properties,
      experimentCombination: AnalyticsHandler.optimizeExperimentsString,
    };
    segmentTrack(event, propertiesWithExperimentCombination);
  }

  setAnonymousId(anonymousId: string): void {
    segmentSetAnonymousId(anonymousId);
  }

  setExperiments(experiments?: Experiment[]): void {
    AnalyticsHandler.optimizeExperimentsString = experiments
      ? experiments
          .filter((experiment) => experiment.optimizeId)
          .map(
            (experiment) =>
              `${experiment.optimizeId}.${experiment.assignedVariant}`
          )
          .join('!')
      : undefined;

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
    const properties = {
      category,
      experimentCombination: AnalyticsHandler.optimizeExperimentsString,
      name,
    };
    segmentPage(name, properties);
  }

  identify(traits: object, userId?: string): void {
    segmentIdentify(traits, userId);
  }
}

export default AnalyticsHandler;
