import { Brand } from '@vroom-web/ui';
import React from 'react';

import Santander from './Santander';
import TDA from './TDA';
import Vroom from './Vroom';

// TODO: implement brand context
const Home: React.FC<{ brand: Brand }> = ({ brand }) => {
  if (brand === Brand.SANTANDER) {
    return <Santander />;
  }
  if (brand === Brand.TDA) {
    return <TDA />;
  }
  return <Vroom />;
};

export default Home;
