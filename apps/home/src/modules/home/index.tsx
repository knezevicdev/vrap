import { Brand } from '@vroom-web/ui';
import React, { useContext } from 'react';

import { BrandContext } from './BrandContext';
import Santander from './Santander';
import Vroom from './Vroom';

const Home: React.FC = () => {
  const brand = useContext(BrandContext);
  if (brand === Brand.SANTANDER) {
    return <Santander />;
  }
  return <Vroom />;
};

export default Home;
