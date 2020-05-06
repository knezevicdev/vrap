import { ThemeProvider } from '@vroom-web/ui';
import React from 'react';

import StandardFooter from './StandardFooter';

export default { title: 'Standard Footer' };

export const Standard: React.FC = () => {
  return (
    <ThemeProvider>
      <StandardFooter />
    </ThemeProvider>
  );
};
