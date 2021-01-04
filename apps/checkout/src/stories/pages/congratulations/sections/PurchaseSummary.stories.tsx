import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import { ThemeProvider } from 'styled-components';
import { getVroomTheme } from '@vroom-web/temp-ui-alias-for-checkout';

import PurchaseSummary from '../../../../modules/congratulations/sections/PurchaseSummary/PurchaseSummary';
import { purchaseSummaryViewModel } from '../ViewModels';

const theme = getVroomTheme();

export const Success = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <PurchaseSummary {...purchaseSummaryViewModel} />
    </ThemeProvider>
  );
};

Success.parameters = {
  design: {
    type: 'figma',
    url:
      'https://www.figma.com/file/rsB4AJNk9uq81u1ia2U0G1/EComm-Port?node-id=385%3A365',
  },
};

export default {
  title: 'Checkout/Congratulations/Sections/Purchase Summary',
  decorators: [withDesign],
};
