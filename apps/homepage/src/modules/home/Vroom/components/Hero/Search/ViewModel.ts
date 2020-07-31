import { stringify } from 'qs';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { showDefaultVariant } from 'src/integrations/experimentSDK';
import { HomeStore } from 'src/modules/home/store';

interface Link {
  label: string;
  href: string;
}

class SearchViewModel {
  private readonly analyticsHandler: AnalyticsHandler = new AnalyticsHandler();
  private readonly store: HomeStore;

  readonly mobileButtonLabel: string = 'Browse All Vehicles';
  oldCatalogVsNewCatalogDefaultVarient: boolean;
  link: Link;

  constructor(store: HomeStore) {
    this.store = store;

    // FIT-566
    // Persist query string across navigation.
    // This allows vlassic attributuion to work until we can implement a better system.
    const queryString = stringify(this.store.query, {
      addQueryPrefix: true,
    });
    this.oldCatalogVsNewCatalogDefaultVarient = showDefaultVariant(
      'snd-old-catalog-vs-new-catalog',
      this.store.experiments,
      this.store.query
    );

    this.link = {
      href: `/${
        this.oldCatalogVsNewCatalogDefaultVarient ? `catalog` : `cars`
      }${queryString}`,
      label: 'Browse all low-mileage cars\xa0and\xa0trucks',
    };
  }

  handleMobileButtonClick = (): void => {
    // FIT-566
    // Persist query string across navigation.
    // This allows vlassic attributuion to work until we can implement a better system.
    const queryString = stringify(this.store.query, {
      addQueryPrefix: true,
    });
    window.location.href = `/${
      this.oldCatalogVsNewCatalogDefaultVarient ? `catalog` : `cars`
    }${queryString}`;
  };

  handleHomeCatalogCTACLicked = (): void => {
    this.analyticsHandler.trackHomeSearchClicked();
  };
}

export default SearchViewModel;
