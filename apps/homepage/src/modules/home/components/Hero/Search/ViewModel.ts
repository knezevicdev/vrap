import globalEnv from 'src/globalEnv';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { getExperimentVariant } from 'src/integrations/experimentSDK';
import { HomeStore } from 'src/modules/home/store';

interface Link {
  label: string;
  href: string;
}

class SearchViewModel {
  private analyticsHandler: AnalyticsHandler;
  private store: HomeStore;

  readonly mobileButtonLabel: string = 'Browse All Vehicles';

  link: Link = {
    href: '/catalog',
    label: '',
  };
  readonly car: { src: string; alt: string } = {
    src: `${globalEnv.CDN_URL}/modules/home/images/prius.png`,
    alt: 'Prius',
  };

  constructor(store: HomeStore) {
    this.analyticsHandler = new AnalyticsHandler();
    this.store = store;
    const browseAllVehiclesTextExperimentVaraint = getExperimentVariant(
      'snd-homepage-browse-all-low-mileage-vs-browse-our-low-mileage',
      store
    );
    this.link.label = `Browse ${
      browseAllVehiclesTextExperimentVaraint ? 'all' : 'our'
    } low-mileage cars\xa0and\xa0trucks`;
    console.log(browseAllVehiclesTextExperimentVaraint);
  }

  handleMobileButtonClick = (): void => {
    window.location.href = '/catalog';
  };

  handleHomeCatalogCTACLicked = (): void => {
    this.analyticsHandler.trackHomeSearchClicked();
  };
}

export default SearchViewModel;
