import React from 'react';

import { dialogDecorator } from './dialogDecorator';

import MultiplesVehiclesDialog, {
  USE_ON_PAGE,
} from 'src/modules/common/multiplesVehiclesDialog';

export const Default = (): JSX.Element => {
  const vehicles = [
    { car: 'Mazda 2019', vin: '1G1ZG5E71CF306804' },
    { car: 'Mazda 2020', vin: '1G1ZG5E71CF306802' },
    { car: 'Mazda 2021', vin: '1G1ZG5E71CF306803' },
    { car: 'BNW 2020', vin: '1G1ZG5E71CF306805' },
    { car: 'Mazda 2009', vin: '1G1ZG5E71CF306806' },
    { car: 'Mazda X3 2020', vin: '1G1ZG5E71CF306807' },
    { car: 'Mazda CX5 2019', vin: '1G1ZG5E71CF306808' },
    { car: 'Mazda 3', vin: '1G1ZG5E71CF306809' },
  ];

  return (
    <MultiplesVehiclesDialog
      vehicles={vehicles}
      isOpen={true}
      close={() => {
        console.log('closing');
      }}
      trackLicensePlateClick={() => {
        console.log('traking event');
      }}
      useOnPage={USE_ON_PAGE.CONGRATS_PAGE}
    />
  );
};

export default {
  title: 'Checkout/Dialogs/Multiples Vehicles',
  decorators: [dialogDecorator],
};
