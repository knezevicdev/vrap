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
    src: `${globalEnv.CDN_URL}/modules/home/prius.png`,
    alt: 'Prius',
  };

  private store: HomeStore;

  constructor(store: HomeStore) {
    this.store = store;
  }

  isDesktop(): boolean {
    return this.store.deviceType === 'desktop';
  }

  handleMobileButtonClick(): void {
    window.location.href = '/catalog';
  }
}

export default HeroViewModel;
