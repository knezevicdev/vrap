import React from 'react';
import { withDesign } from 'storybook-addon-designs';

import Trade from '../../../../modules/congratulations/components/Trade';

export const Default = (): JSX.Element => {
  return <Trade />;
};

Default.parameters = {
  design: {
    type: 'figma',
    url:
      'https://www.figma.com/file/dQR6dwcmQjEL03qeswcQXh/Buy-Sell-Component?node-id=151%3A1300',
  },
};

export default {
  title: 'Checkout/Congratulations/Components/Trade',
  decorators: [withDesign],
};
