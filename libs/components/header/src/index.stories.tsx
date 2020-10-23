import { Brand, ThemeProvider } from '@vroom-web/ui';
import React from 'react';

import SantanderHeader from './Santander';
import TDAHeader from './TDA';

export default { title: 'Headers' };

export const Santander: React.FC = () => {
  return (
    <ThemeProvider brand={Brand.SANTANDER}>
      <SantanderHeader />
    </ThemeProvider>
  );
};

export const TDA: React.FC = () => {
  return (
    <ThemeProvider brand={Brand.TDA}>
      <TDAHeader />
    </ThemeProvider>
  );
};
