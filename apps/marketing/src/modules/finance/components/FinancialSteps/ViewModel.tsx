import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

class FinancialStepsViewModel {
  readonly title = 'How It Works';
  readonly steps = [
    {
      key: 0,
      title: 'Find Your Ride',
      href: '/cars',
      icon: `${publicRuntimeConfig.BASE_PATH}/modules/vroom/icons/1-active.svg`,
      description: `Browse thousands of high-quality, low-mileage vehicles, and find the one that's right for you. <link>Shop Now</link>`,
    },
    {
      key: 1,
      title: 'Get Your Financing Terms',
      href: '/credit',
      icon: `${publicRuntimeConfig.BASE_PATH}/modules/vroom/icons/2-active.svg`,
      description: `<link>Click here</link> to apply in minutes. You will need to select a vehicle first to receive exact financing terms.`,
    },
    {
      key: 2,
      title: 'Sign, Pay and Drive',
      icon: `${publicRuntimeConfig.BASE_PATH}/modules/vroom/icons/3-active.svg`,
      description:
        'Finalize your purchase, then schedule your delivery or in-store pickup. If you finance with us, Vroom will register your vehicle on your behalf and mail your registration and plates to you, once your state DMV has prepared them.',
    },
  ];
  readonly stepsImage = {
    src: `${publicRuntimeConfig.BASE_PATH}/modules/vroom/images/finance/parallax.png`,
    alt: 'steps',
  };
}

export default FinancialStepsViewModel;
