import React from 'react';
import { withDesign } from 'storybook-addon-designs';

import { vehicleInvSearch } from './ViewModel';

import SelectedCar from 'src/modules/deals/sections/DealSummary/SelectedCar';

export const SelectedCarView = (): JSX.Element => {
  return <SelectedCar vehicle={vehicleInvSearch} />;
};

export default {
  title: 'Checkout/SelectedCar',
  decorators: [withDesign],
};
