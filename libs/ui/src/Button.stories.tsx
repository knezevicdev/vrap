import React from 'react';

import Button from './Button';
import ThemeProvider from './ThemeProvider';

export default { title: 'Button' };

export const withText: React.FC = () => {
  return (
    <ThemeProvider>
      <Button>Oh hey there</Button>
    </ThemeProvider>
  );
};
