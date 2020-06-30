import globalEnv from 'src/globalEnv';
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

  link: Link = {
    href: '/catalog',
    label: '',
  };
  readonly car: { src: string; alt: string } = {
    src: `${process.env.PUBLIC_URL}/modules/home/images/prius.png`,
    alt: 'Prius',
  };

  constructor(store: HomeStore) {
    const browseAllVehiclesTextExperimentVaraint = showDefaultVariant(
      'snd-homepage-browse-all-low-mileage-vs-browse-our-low-mileage',
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
