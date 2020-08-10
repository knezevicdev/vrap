import globalEnv from 'src/globalEnv';

interface Step {
  description: string;
  alt: string;
  src: string;
  title: string;
}

class ViewModel {
  readonly steps: Step[] = [
    {
      title: 'Browse Online',
      description:
        'Explore thousands of vehicles with new inventory added every week.',
      alt: 'High-Quality Vehicles',
      src: `${globalEnv.BASE_PATH}/modules/home/santander/images/icon_online_browse.svg`,
    },
    {
      title: 'Make It Yours',
      description: 'Find the one, customize your deal and sign.',
      alt: 'Flexible Financing',
      src: `${globalEnv.BASE_PATH}/modules/home/santander/images/icon_ownership.svg`,
    },
    {
      title: 'Get It Delivered',
      description:
        'Delivery straight to you. Make sure the car is right for you and enjoy!',
      alt: 'Buying Made Easy',
      src: `${globalEnv.BASE_PATH}/modules/home/santander/images/icon_car.svg`,
    },
  ];
}

export default ViewModel;
