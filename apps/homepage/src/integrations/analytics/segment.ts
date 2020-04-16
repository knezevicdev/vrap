function onAnalyticsReady(callback: () => void): void {
  try {
    window.analytics.ready(callback);
  } catch {
    console.log('window.analytics is not defined');
  }
}

export function page(name: string, properties?: object): void {
  onAnalyticsReady(() => {
    window.analytics.page(name, properties);
  });
}

export function track(event: string, properties?: object): void {
  onAnalyticsReady(() => {
    window.analytics.track(event, properties);
  });
}

export function identify(traits: object, userId?: string): void {
  onAnalyticsReady(() => {
    if (userId) {
      window.analytics.identify(userId, traits);
    } else {
      window.analytics.identify(traits);
    }
  });
}
