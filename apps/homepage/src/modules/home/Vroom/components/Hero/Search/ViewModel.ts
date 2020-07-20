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
  condenseCatalogLinksDefaultVariant: boolean;
  link: Link;

  constructor(store: HomeStore) {
    this.store = store;

    // FIT-566
    // Persist query string across navigation.
    // This allows vlassic attributuion to work until we can implement a better system.
    const queryString = stringify(this.store.query, {
      addQueryPrefix: true,
    });

    this.link = {
      href: `/catalog${queryString}`,
      label: '',
    };

    const browseAllVehiclesTextExperimentVaraint = showDefaultVariant(
      'snd-homepage-browse-all-low-mileage-vs-browse-our-low-mileage',
      store.experiments,
      store.query
    );
    this.condenseCatalogLinksDefaultVariant = showDefaultVariant(
      'snd-home-condense-catalog-links',
      store.experiments,
      store.query
    );
    this.link.label = `Browse ${
      browseAllVehiclesTextExperimentVaraint ? 'all' : 'our'
    } low-mileage cars\xa0and\xa0trucks`;
  }

  handleMobileButtonClick = (): void => {
    // FIT-566
    // Persist query string across navigation.
    // This allows vlassic attributuion to work until we can implement a better system.
    const queryString = stringify(this.store.query, {
      addQueryPrefix: true,
    });
    window.location.href = `/catalog${queryString}`;
  };

  handleHomeCatalogCTACLicked = (): void => {
    this.analyticsHandler.trackHomeSearchClicked();
  };
}

export default SearchViewModel;
