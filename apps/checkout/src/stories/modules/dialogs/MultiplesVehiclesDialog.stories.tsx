import React from 'react';

import { dialogDecorator } from './dialogDecorator';

import MultiplesVehiclesDialog, {
  USE_ON_PAGE,
} from 'src/modules/common/multiplesVehiclesDialog';

export const Default = (): JSX.Element => {
  const vehicles = [
    { car: 'Mazda 2019', vin: 'XVN' },
    { car: 'Mazda 2020', vin: 'XVNXS' },
    { car: 'Mazda 2021', vin: 'XVNXSSD' },
    { car: 'BNW 2020', vin: 'XVNXUYT' },
    { car: 'Mazda 2009', vin: 'XVNSFGG' },
    { car: 'Mazda X3 2020', vin: 'XVNXS3X' },
    { car: 'Mazda CX5 2019', vin: 'XVNCX5' },
    { car: 'Mazda 3', vin: 'XVNX3' },
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
