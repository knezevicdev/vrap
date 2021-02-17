import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

interface Step {
  description: string;
  alt: string;
  src: string;
  title: string;
}

class ViewModel {
  readonly steps: Step[] = [
    {
      title: 'Browse Online or In-Store',
      description:
        'Explore thousands of vehicles with new inventory added every week.',
      alt: 'High-Quality Vehicles',
      src: `${publicRuntimeConfig.BASE_PATH}/modules/home/images/car_search_icon.svg`,
    },
    {
      title: 'Make It Yours',
      description:
        'Find the one, customize your deal and sign. Pick it up in store, or have it delivered',
      alt: 'Flexible Financing',
      src: `${publicRuntimeConfig.BASE_PATH}/modules/home/images/finance_icon.svg`,
    },
    {
      title: 'Selling or Trading-in?',
      description:
        'Our expert car-buyers will give you an instant guaranteed price for your vehicle.',
      alt: 'Buying Made Easy',
      src: `${publicRuntimeConfig.BASE_PATH}/modules/home/images/delivery_truck_icon.svg`,
    },
  ];
}

export default ViewModel;
