import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import { ThemeProvider } from 'styled-components';
import { getVroomTheme } from '@vroom-web/temp-ui-alias-for-checkout';

import ReservedCar from '../../../../modules/congratulations/sections/ReservedCar';
import { reservedCarViewModel } from '../ViewModels';

const theme = getVroomTheme();

export const Success = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <ReservedCar {...reservedCarViewModel} />
    </ThemeProvider>
  );
};

Success.parameters = {
  design: {
    type: 'figma',
    url:
      'https://www.figma.com/file/yhvMWzN95E1DdNLBfEr5OH/Desktop-Congrats?node-id=1%3A4',
  },
};

export default {
  title: 'Checkout/Congratulations/Sections/Reserved Car',
  decorators: [withDesign],
};