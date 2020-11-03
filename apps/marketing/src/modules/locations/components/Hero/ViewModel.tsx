import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

class HeroViewModel {
  readonly tagline = 'Store Location';
  readonly title = 'Stop In And Drive';
  readonly subtitle =
    'We have 10 locations in Texas. No\xa0appointment\xa0needed.';
  readonly buttonLabel = 'Shop Now';
  readonly carsLink = '/cars';
  car = {
    src: `${publicRuntimeConfig.BASE_PATH}/modules/tda/images/ford.png`,
    alt: 'F-150',
  };
}

export default HeroViewModel;
