import { HomeStore } from '../../store';

import globalEnv from 'src/globalEnv';
import { showDefaultVariant } from 'src/integrations/experimentSDK';

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
  car: { src: string; alt: string };
  readonly sellTradeExperimentVariant: boolean;
  f150TruckHeightVariant: boolean;

  constructor(store: HomeStore) {
    this.sellTradeExperimentVariant = showDefaultVariant(
      'fit-homepage-selltrade',
      store.experiments,
      store.query
    );
    const priusVsf150ImageDefaultVariant = showDefaultVariant(
      'snd-homepage-prius-vs-f150',
      store.experiments,
      store.query
    );
    this.f150TruckHeightVariant =
      !priusVsf150ImageDefaultVariant && !this.sellTradeExperimentVariant;
    this.car = {
      src: `${globalEnv.CDN_URL}/modules/home/images/${
        priusVsf150ImageDefaultVariant ? 'prius' : 'ford'
      }.png`,
      alt: priusVsf150ImageDefaultVariant ? 'Prius' : 'F-150',
    };
  }
}

export default HeroViewModel;
