import { ThemeProvider } from '@vroom-web/ui';
import React from 'react';

import SimpleHeader from './SimpleHeader';

export default { title: 'SimpleHeader' };

export const byItself: React.FC = () => {
  return (
    <ThemeProvider>
      <SimpleHeader />
    </ThemeProvider>
  );
};
