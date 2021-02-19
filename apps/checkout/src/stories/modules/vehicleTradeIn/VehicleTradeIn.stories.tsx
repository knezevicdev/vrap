import React from 'react';

import VehicleTradeIn from 'src/modules/vehicleTradeIn/View';
 
export const Default = (): JSX.Element => {
 
  const viewModel = {} as any
  return (
    <VehicleTradeIn viewModel={viewModel}/>
  );
};

export default {
  title: 'Checkout/Trade/Vehicle Trade In',
};
