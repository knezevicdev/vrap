import { stringify } from 'qs';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { HomeStore } from 'src/modules/home/store';

class SearchViewModel {
  private readonly analyticsHandler: AnalyticsHandler = new AnalyticsHandler();
  private readonly store: HomeStore;

  readonly mobileButtonLabel: string = 'Browse All Vehicles';

  constructor(store: HomeStore) {
    this.store = store;
  }

  handleMobileButtonClick = (): void => {
    // FIT-566
    // Persist query string across navigation.
    // This allows vlassic attributuion to work until we can implement a better system.
    const queryString = stringify(this.store.query, {
      addQueryPrefix: true,
    });
    window.location.href = `/cars${queryString}`;
    this.analyticsHandler.trackHomeSearchClicked();
  };
}

export default SearchViewModel;
