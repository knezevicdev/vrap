import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import { ThemeProvider } from 'styled-components';
import { getVroomTheme } from 'vroom-ui';

import Next from '../../../../modules/congrats/sections/Next';
import { nextViewModel } from '../ViewModels';

const theme = getVroomTheme('/assets/fonts/Vroom');

export const Success = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Next {...nextViewModel} />
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
  title: 'Checkout/Congrats/Sections/Next',
  decorators: [withDesign],
};
