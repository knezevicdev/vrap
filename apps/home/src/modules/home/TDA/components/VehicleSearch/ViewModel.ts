import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

interface Vehicle {
  type: string;
  link: string;
  image: string;
  imageSelected: string;
}

class ViewModel {
  readonly title: string = 'Search from thousands\xa0of\xa0vehicles';
  readonly vehicles: Vehicle[] = [
    {
      type: 'Sedans',
      link: '/cars/types/sedan',
      image: `${publicRuntimeConfig.BASE_PATH}/modules/home/images/sedan.png`,
      imageSelected: `${publicRuntimeConfig.BASE_PATH}/modules/home/images/Sedan-Selected.png`,
    },
    {
      type: 'SUVs',
      link: '/cars/types/suv',
      image: `${publicRuntimeConfig.BASE_PATH}/modules/home/images/suv.png`,
      imageSelected: `${publicRuntimeConfig.BASE_PATH}/modules/home/images/SUV-Selected.png`,
    },
    {
      type: 'Hatchbacks',
      link: '/cars/types/hatchback',
      image: `${publicRuntimeConfig.BASE_PATH}/modules/home/images/hatchback.png`,
      imageSelected: `${publicRuntimeConfig.BASE_PATH}/modules/home/images/Hatchback-Selected.png`,
    },
    {
      type: 'Trucks',
      link: '/cars/types/truck',
      image: `${publicRuntimeConfig.BASE_PATH}/modules/home/images/truck.png`,
      imageSelected: `${publicRuntimeConfig.BASE_PATH}/modules/home/images/Truck-Selected.png`,
    },
    {
      type: 'Coupes',
      link: '/cars/types/coupe',
      image: `${publicRuntimeConfig.BASE_PATH}/modules/home/images/coupe.png`,
      imageSelected: `${publicRuntimeConfig.BASE_PATH}/modules/home/images/Coupe-Selected.png`,
    },
    {
      type: 'Convertibles',
      link: '/cars/types/convertible',
      image: `${publicRuntimeConfig.BASE_PATH}/modules/home/images/convertible.png`,
      imageSelected: `${publicRuntimeConfig.BASE_PATH}/modules/home/images/Convertible-Selected.png`,
    },
    {
      type: 'Wagons',
      link: '/cars/types/wagon',
      image: `${publicRuntimeConfig.BASE_PATH}/modules/home/images/wagon.png`,
      imageSelected: `${publicRuntimeConfig.BASE_PATH}/modules/home/images/Wagon-Selected.png`,
    },
    {
      type: 'Minivans',
      link: '/cars/types/minivan',
      image: `${publicRuntimeConfig.BASE_PATH}/modules/home/images/minivan.png`,
      imageSelected: `${publicRuntimeConfig.BASE_PATH}/modules/home/images/Minivan-Selected.png`,
    },
  ];
}

export default ViewModel;
