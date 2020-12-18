import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import { ThemeProvider } from 'styled-components';
import { getVroomTheme } from 'vroom-ui';

import Loading from '../../../../modules/congratulations/sections/Loading';

const theme = getVroomTheme();

export const Static = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Loading />
    </ThemeProvider>
  );
};

Static.parameters = {
  design: {
    type: 'figma',
    url:
      'https://www.figma.com/file/rsB4AJNk9uq81u1ia2U0G1/EComm-Port?node-id=952%3A0',
  },
};

export default {
  title: 'Checkout/Congratulations/Sections/Loading',
  decorators: [withDesign],
};
