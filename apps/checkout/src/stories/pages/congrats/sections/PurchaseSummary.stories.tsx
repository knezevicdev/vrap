import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import { ThemeProvider } from 'styled-components';
import { getVroomTheme } from 'vroom-ui/src/foundation/themes/Vroom';

import PurchaseSummary from '../../../../modules/congrats/sections/PurchaseSummary/PurchaseSummary';
import { purchaseSummaryViewModel } from '../ViewModels';

const theme = getVroomTheme('/assets/fonts/Vroom');

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
  title: 'Checkout/Congrats/Sections/Purchase Summary',
  decorators: [withDesign],
};
