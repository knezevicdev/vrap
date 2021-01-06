import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

class PartnersViewModel {
  readonly title = 'Our Lending Partners';
  readonly description =
    'We work with more than a dozen banks and lending partners to get you a competitive rate. Here are just a few:';
  readonly partners = [
    {
      key: 0,
      src: `${publicRuntimeConfig.BASE_PATH}/modules/vroom/images/finance/vroom-chase-logo.svg`,
      alt: 'vroom financial services by chase',
    },
    {
      key: 1,
      src: `${publicRuntimeConfig.BASE_PATH}/modules/vroom/images/finance/ally-logo.svg`,
      alt: 'ally',
    },
    {
      key: 2,
      src: `${publicRuntimeConfig.BASE_PATH}/modules/vroom/images/finance/santander-logo.svg`,
      alt: 'santander consumer USA',
    },
    {
      key: 3,
      src: `${publicRuntimeConfig.BASE_PATH}/modules/vroom/images/finance/capital-one-logo.svg`,
      alt: 'capital one',
    },
    {
      key: 4,
      src: `${publicRuntimeConfig.BASE_PATH}/modules/vroom/images/finance/td-bank-logo.svg`,
      alt: 'td bank',
    },
    {
      key: 5,
      src: `${publicRuntimeConfig.BASE_PATH}/modules/vroom/images/finance/suntrust-logo.svg`,
      alt: 'suntrust',
    },
  ];
}

export default PartnersViewModel;
