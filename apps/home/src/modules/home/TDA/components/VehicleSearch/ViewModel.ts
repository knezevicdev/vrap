import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

interface Vehicle {
  type: string;
  link: string;
  image: string;
}

class ViewModel {
  readonly title: string = 'Search from thousands of vehicles';
  readonly vehicles: Vehicle[] = [
    {
      type: 'Sedans',
      link: '/cars/types/sedan',
      image: `${publicRuntimeConfig.BASE_PATH}/modules/home/tda/images/sedan.png`,
    },
    {
      type: 'SUVs',
      link: '/cars/types/suv',
      image: `${publicRuntimeConfig.BASE_PATH}/modules/home/tda/images/suv.png`,
    },
    {
      type: 'Hatchbacks',
      link: '/cars/types/hatchback',
      image: `${publicRuntimeConfig.BASE_PATH}/modules/home/tda/images/hatchback.png`,
    },
    {
      type: 'Trucks',
      link: '/cars/types/truck',
      image: `${publicRuntimeConfig.BASE_PATH}/modules/home/tda/images/truck.png`,
    },
    {
      type: 'Coupes',
      link: '/cars/types/coupe',
      image: `${publicRuntimeConfig.BASE_PATH}/modules/home/tda/images/coupe.png`,
    },
    {
      type: 'Convertibles',
      link: '/cars/types/convertible',
      image: `${publicRuntimeConfig.BASE_PATH}/modules/home/tda/images/convertible.png`,
    },
    {
      type: 'Wagons',
      link: '/cars/types/wagon',
      image: `${publicRuntimeConfig.BASE_PATH}/modules/home/tda/images/wagon.png`,
    },
    {
      type: 'Minivans',
      link: '/cars/types/minivan',
      image: `${publicRuntimeConfig.BASE_PATH}/modules/home/tda/images/minivan.png`,
    },
  ];
}

export default ViewModel;
