import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

class HeroViewModel {
  readonly tagline = 'FINANCE WITH VROOM';
  readonly title = `Your Low Rate Awaits`;
  readonly subtitle = `Apply in Minutes. Get Approved Fast. Highly Competitive Rates.`;
  readonly buttonLabel = 'Apply Now';
  readonly carsLink = '/credit';
  car = {
    src: `${publicRuntimeConfig.BASE_PATH}/modules/vroom/images/finance/finance-car.png`,
    alt: 'Finance car',
  };
}

export default HeroViewModel;
