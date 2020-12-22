import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import { ThemeProvider } from 'styled-components';
import { getVroomTheme } from 'vroom-ui';

import Error from '../../../../modules/congratulations/sections/Error';

const theme = getVroomTheme();

export const Static = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Error />
    </ThemeProvider>
  );
};

Static.parameters = {
  design: {
    type: 'figma',
    url:
      'https://www.figma.com/file/rsB4AJNk9uq81u1ia2U0G1/EComm-Port?node-id=790%3A0',
  },
};

export default {
  title: 'Checkout/Congratulations/Sections/Error',
  decorators: [withDesign],
};
