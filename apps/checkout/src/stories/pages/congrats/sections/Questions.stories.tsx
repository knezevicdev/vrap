import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import { ThemeProvider } from 'styled-components';
import { getVroomTheme } from 'vroom-ui';

import Questions from '../../../../modules/congrats/sections/Questions';
import { questionsViewModel } from '../ViewModels';

const theme = getVroomTheme();

export const Success = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Questions {...questionsViewModel} />
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
  title: 'Checkout/Congrats/Sections/Questions',
  decorators: [withDesign],
};
