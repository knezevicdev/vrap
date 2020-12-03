import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import { ThemeProvider } from 'styled-components';
import { getVroomTheme } from 'vroom-ui/src/foundation/themes/Vroom';

import Questions from '../../../../modules/congrats/sections/Questions';

const theme = getVroomTheme('/assets/fonts/Vroom');

const phone = {
  href: '+18555241300',
  label: '(855) 524-1300',
};

export const Success = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Questions phone={phone} />
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
