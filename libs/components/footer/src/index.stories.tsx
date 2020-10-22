import { Brand, ThemeProvider } from '@vroom-web/ui';
import React from 'react';

import SantanderFooter from './Santander';
import TDAFooter from './TDA';
import StandardFooter from './Vroom/assembled/StandardFooter';

export default { title: 'Footers' };

export const Vroom: React.FC = () => {
  return (
    <ThemeProvider>
      <StandardFooter />
    </ThemeProvider>
  );
};

export const Santander: React.FC = () => {
  return (
    <ThemeProvider brand={Brand.SANTANDER}>
      <SantanderFooter />
    </ThemeProvider>
  );
};

export const TDA: React.FC = () => {
  return (
    <ThemeProvider brand={Brand.TDA}>
      <TDAFooter />
    </ThemeProvider>
  );
};
