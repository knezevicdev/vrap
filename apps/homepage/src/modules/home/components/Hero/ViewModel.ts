import { HomeStore } from '../../store';

import globalEnv from 'src/globalEnv';

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
  readonly link: Link = {
    href: '/catalog',
    label: 'Browse all low-mileage cars\xa0and\xa0trucks',
  };
  readonly car: { src: string; alt: string } = {
    src: `${globalEnv.CDN_URL}/modules/home/images/prius.png`,
    alt: 'Prius',
  };

  private store: HomeStore;

  constructor(store: HomeStore) {
    this.store = store;
  }

  showDefaultVariant = (): boolean => {
    const experimentId = 'fit-homepage-selltrade';
    const forcedExperimentId = `experiment-${experimentId}`;

    if (this.store.query) {
      const forcedVariant = this.store.query[forcedExperimentId];
      return forcedVariant === '0';
    }

    if (this.store.experiments) {
      const experiment = this.store.experiments.find(
        (x) => x.id === experimentId
      );

      return experiment ? experiment.assignedVariant === 0 : true;
    }

    return true;
  };

  handleMobileButtonClick(): void {
    window.location.href = '/catalog';
  }
}

export default HeroViewModel;
