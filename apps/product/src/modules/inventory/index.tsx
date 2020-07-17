import { Brand } from '@vroom-web/ui';
import React, { useContext } from 'react';

import { BrandContext } from './BrandContext';
import Santander from './Santader';
import Vroom from './Vroom';

const Inventory: React.FC = () => {
  const brand = useContext(BrandContext);
  if (brand === Brand.SANTANDER) {
    return <Santander />;
  }
  return <Vroom />;
};

export default Inventory;
