import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

interface Link {
  label: string;
  href: string;
}

class HeroViewModel {
  readonly title: string = 'get cash for your\xa0car.';
  readonly titleExperiment: string = 'delivering, now and\xa0always.';
  readonly subtitle: string =
    'Buy a car entirely online, and have it safely delivered, contact-free.';
  readonly subtitleExperiment: string =
    'Sell us your car entirely online – we\'ll even pick it up.';
  readonly subtitleLink: Link = {
    href: 'https://www.vroom.com/how-it-works',
    label: 'Learn\xa0More',
  };
  readonly mobileButtonLabel: string = 'Browse All Vehicles';
  car = {
    src: `${publicRuntimeConfig.VROOM_URL}/static-assets/images/home-page/ford.png`,
    alt: 'F-150',
  };
}

export default HeroViewModel;
