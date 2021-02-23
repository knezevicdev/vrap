import React from 'react';

import Model from 'src/modules/vehicleTradeIn/Model';
import VehicleTradeIn from 'src/modules/vehicleTradeIn/View';
import ViewModel from 'src/modules/vehicleTradeIn/ViewModel';

export const Default = (): JSX.Element => {
  const model = new Model();
  const viewModel = new ViewModel(model);

  return <VehicleTradeIn viewModel={viewModel} />;
};

export default {
  title: 'Checkout/Trade/Vehicle Trade In',
};
