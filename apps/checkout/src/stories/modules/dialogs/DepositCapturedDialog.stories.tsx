import React from 'react';

import VehicleSoldDialog from 'src/modules/dealValidatorModal/content/VehicleSold';

export const Default = (): JSX.Element => {
  return <VehicleSoldDialog carName="2017 Kia Optima" />;
};

export default {
  title: 'Checkout/Dialogs/Deposit Captured',
};
