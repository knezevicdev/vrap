import { stringify } from 'qs';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { HomeStore } from 'src/modules/home/store';

class ViewModel {
  private readonly analyticsHandler: AnalyticsHandler = new AnalyticsHandler();
  private readonly store: HomeStore;
  readonly button: string = 'Shop Now';

  constructor(store: HomeStore) {
    this.store = store;
  }

  handleButtonClick = (): void => {
    this.analyticsHandler.trackShowNowClicked();
    // FIT-566
    // Persist query string across navigation.
    // This allows vlassic attributuion to work until we can implement a better system.
    const queryString = stringify(this.store.query, {
      addQueryPrefix: true,
    });
    window.location.href = `/catalog${queryString}`;
  };
}

export default ViewModel;
