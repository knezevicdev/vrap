import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

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
  car = {
    src: `${publicRuntimeConfig.VROOM_URL}/static-assets/images/home-page/ford.png`,
    alt: 'F-150',
  };
}

export default HeroViewModel;
