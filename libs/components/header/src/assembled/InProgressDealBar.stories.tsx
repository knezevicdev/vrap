import { ThemeProvider } from '@vroom-web/ui';
import React from 'react';

import InProgressDealBar from './InProgressDealBar';

export default { title: 'InProgressDealBar' };

// Using QA, so that it's easy to log in to qa.vroom.com and copy the authToken cookie.
const gearboxPrivateUrl = 'https://gearbox-qa-int.vroomapi.com/query-private';

export const byItself: React.FC = () => {
  return (
    <ThemeProvider>
      <p>
        NOTE: To see this component, you must have a valid authToken cookie
        defined in your browser! Log in on qa.vroom.com, copy the authToken
        cookie that gets set, and paste it into you localhost cookies. Then,
        refresh this page. If your logged in user has an In-Progress deal, after
        a moment (1-5 seconds) this component will show.
      </p>
      <InProgressDealBar gearboxPrivateUrl={gearboxPrivateUrl} />
    </ThemeProvider>
  );
};
