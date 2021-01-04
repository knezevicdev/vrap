import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import { ThemeProvider } from 'styled-components';
import { getVroomTheme } from '@vroom-web/temp-ui-alias-for-checkout';

import Next from '../../../../modules/congratulations/sections/Next';
import { nextViewModel } from '../ViewModels';

const theme = getVroomTheme();

export const Static = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Next {...nextViewModel} />
    </ThemeProvider>
  );
};

Static.parameters = {
  design: {
    type: 'figma',
    url:
      'https://www.figma.com/file/yhvMWzN95E1DdNLBfEr5OH/Desktop-Congrats?node-id=1%3A4',
  },
};

export default {
  title: 'Checkout/Congratulations/Sections/Next',
  decorators: [withDesign],
};
