import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

class HeroViewModel {
  readonly tagline = 'HOW IT WORKS';
  readonly title = `Buying and Selling
  made easy`;
  readonly subtitle = `You’ve found it: The better way to buy or sell a\xa0car.
    Find\xa0a great car and make\xa0it yours or sell\xa0us the one you have, all\xa0without a trip to the\xa0dealership. But\xa0how,\xa0exactly? Here’s\xa0how.`;
  readonly buttonLabel = 'Shop Now';
  readonly carsLink = '/cars';
  car = {
    src: `${publicRuntimeConfig.BASE_PATH}/modules/vroom/images/how-it-works-car.png`,
    alt: 'How it works car',
  };
}

export default HeroViewModel;
