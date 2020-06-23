import { HomeStore } from '../../store';

import globalEnv from 'src/globalEnv';
import { getExperimentVariant } from 'src/integrations/experimentSDK';

interface Link {
  label: string;
  href: string;
}

class HeroViewModel {
  readonly title: string = 'delivering, now and\xa0always.';
  readonly subtitle: string =
    'Buy a car entirely online, and have it safely delivered, contact-free.';
  readonly subtitleLink: Link = {
    href: 'https://vroom.zendesk.com/hc/en-us',
    label: 'Learn\xa0More',
  };
  readonly mobileButtonLabel: string = 'Browse All Vehicles';
  readonly car: { src: string; alt: string } = {
    src: `${globalEnv.CDN_URL}/modules/home/images/prius.png`,
    alt: 'Prius',
  };
  readonly sellTradeExperimentVariant: boolean;

  private store: HomeStore;

  constructor(store: HomeStore) {
    this.store = store;
    this.sellTradeExperimentVariant = getExperimentVariant(
      'fit-homepage-selltrade',
      store
    );
  }
}

export default HeroViewModel;
