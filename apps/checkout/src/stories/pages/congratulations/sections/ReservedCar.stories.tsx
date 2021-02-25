import { getVroomTheme } from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import {
  reservedCarViewModel,
  reservedCarViewModelHasTradeIn,
} from '../ViewModels';

import ReservedCar from 'src/modules/congratulations/sections/ReservedCar';

const theme = getVroomTheme();

export const HasTradeIn = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <ReservedCar {...reservedCarViewModelHasTradeIn} />
    </ThemeProvider>
  );
};

export const NoTradeIn = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <ReservedCar {...reservedCarViewModel} />
    </ThemeProvider>
  );
};

export default {
  title: 'Checkout/Congratulations/Sections/Reserved Car',
};
