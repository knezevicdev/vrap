import { ThemeProvider } from '@vroom-web/ui';
import React from 'react';

import SimpleHeader from './SimpleHeader';

export default { title: 'SimpleHeader' };

export const byItself: React.FC = () => {
  return (
    <ThemeProvider>
      <p>
        NOTE: This component has a different appearance based on whether you are
        logged out or in. To see the logged in view of this component, you must
        have a valid authToken cookie defined in your browser! Log in on
        qa.vroom.com, copy the authToken cookie that gets set, and paste it into
        you localhost cookies. Then, refresh this page.
      </p>
      <SimpleHeader />
    </ThemeProvider>
  );
};
