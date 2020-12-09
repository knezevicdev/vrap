import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import { ThemeProvider } from 'styled-components';
import { getVroomTheme } from 'vroom-ui';

import ReservedCar from '../../../../modules/congrats/sections/ReservedCar';

const theme = getVroomTheme('/assets/fonts/Vroom');

const data = {
  car: '2018 Land Rover Range Rover Sport',
  image: {
    alt: '2018 Land Rover Range Rover Sport',
    src: '/assets/car.png',
  },
  email: 'ph123@gmail.com',
  phoneNumber: '1 (212) 200-1000',
};

export const Success = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <ReservedCar data={data} />
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
  title: 'Checkout/Congrats/Sections/Reserved Car',
  decorators: [withDesign],
};
