// TODO: remove this when all use cases of analytics are using the AnalyticsHandler

import {
  identify as segmentIdentify,
  page as segmentPage,
  track as segmentTrack,
} from './segment';

export function page(name: string, properties?: object): void {
  segmentPage(name, properties);
}

export function track(event: string, properties?: object): void {
  segmentTrack(event, properties);
}

export function identify(traits: object, userId?: string): void {
  segmentIdentify(traits, userId);
}
