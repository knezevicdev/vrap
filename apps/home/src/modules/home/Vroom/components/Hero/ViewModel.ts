import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

interface Link {
  label: string;
  href: string;
}

class HeroViewModel {
  readonly title: string = 'delivering, now and\xa0always.';
  readonly subtitle: string =
    'Buy, sell, or trade vehicles all from your couch.';
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
