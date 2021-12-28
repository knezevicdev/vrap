import { track } from '../AnalyticsLib';

export function trackSearch(analyticsData) {
  const category =
    window.location.pathname === '/'
      ? 'Homepage'
      : window.location.pathname.split('/')[1];
  const {
    eventName,
    action,
    label,
    searchType,
    numberOfResults,
    previousUrl,
  } = analyticsData;
  track({
    eventName,
    action,
    category,
    numberOfResults,
    previousUrl,
    query: label,
    label: searchType,
  });
}

export function trackHomePageSearch(query) {
  track({
    eventName: 'interaction - Search',
    action: 'search',
    category: 'Homepage',
    query,
  });
}

export function trackHomepageCTAClick() {
  track({
    eventName: 'Homepage CTA Clicked',
    action: 'click',
    category: 'cta',
  });
}

export function trackSecondaryHomepageCTAClick() {
  track({
    eventName: 'Browse Button Clicked',
    action: 'click',
    category: 'cta',
  });
}
