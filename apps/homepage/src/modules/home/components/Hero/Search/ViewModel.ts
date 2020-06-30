import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { showDefaultVariant } from 'src/integrations/experimentSDK';
import { HomeStore } from 'src/modules/home/store';

interface Link {
  label: string;
  href: string;
}

class SearchViewModel {
  private analyticsHandler: AnalyticsHandler = new AnalyticsHandler();

  readonly mobileButtonLabel: string = 'Browse All Vehicles';
  condenseCatalogLinksDefaultVariant: boolean;
  link: Link = {
    href: '/catalog',
    label: '',
  };

  constructor(store: HomeStore) {
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
    window.location.href = '/catalog';
  };

  handleHomeCatalogCTACLicked = (): void => {
    this.analyticsHandler.trackHomeSearchClicked();
  };
}

export default SearchViewModel;
