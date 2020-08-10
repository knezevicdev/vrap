import { stringify } from 'qs';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { HomeStore } from 'src/modules/home/store';

class WhoWeAreViewModel {
  private readonly analyticsHandler: AnalyticsHandler;
  private readonly store: HomeStore;

  readonly title: string = 'who we are';
  readonly subtitle: string =
    'Our hundreds of team members are helping Vroom revolutionize the way people buy, sell, and trade in cars. Count on us to make your next car buying experience the best you’ve ever had.';
  readonly button: string = 'LEARN MORE';

  constructor(store: HomeStore) {
    this.analyticsHandler = new AnalyticsHandler();
    this.store = store;
  }

  learnMoreClicked(): void {
    this.analyticsHandler.trackWhoWeAreLearnMoreClicked();
    // FIT-566
    // Persist query string across navigation.
    // This allows vlassic attributuion to work until we can implement a better system.
    const queryString = stringify(this.store.query, {
      addQueryPrefix: true,
    });
    window.location.href = `/about${queryString}`;
  }
}

export default WhoWeAreViewModel;
