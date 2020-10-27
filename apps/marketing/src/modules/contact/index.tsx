import { Brand } from '@vroom-web/ui';
import React, { useContext } from 'react';

import { BrandContext } from './BrandContext';
import Santander from './Santander';
import TDA from './TDA';
import Vroom from './Vroom';

const Contact: React.FC = () => {
  const brand = useContext(BrandContext);

  if (brand === Brand.SANTANDER) {
    return <Santander />;
  }
  if (brand === Brand.TDA) {
    return <TDA />;
  }
  return <Vroom />;
};

export default Contact;
