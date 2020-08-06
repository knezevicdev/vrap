import { stringify } from 'qs';

import SantanderAnalyticsHandler from 'src/integrations/SantanderAnalyticsHandler';
import { HomeStore } from 'src/modules/home/store';

class ViewModel {
  private readonly analyticsHandler: SantanderAnalyticsHandler = new SantanderAnalyticsHandler();
  private readonly store: HomeStore;
  readonly button: string = 'Shop Now';

  constructor(store: HomeStore) {
    this.store = store;
  }

  handleButtonClick = (): void => {
    this.analyticsHandler.trackShopNow();
    // FIT-566
    // Persist query string across navigation.
    // This allows vlassic attributuion to work until we can implement a better system.
    const queryString = stringify(this.store.query, {
      addQueryPrefix: true,
    });
    window.location.href = `/cars${queryString}`;
  };
}

export default ViewModel;
