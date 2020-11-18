import { Brand } from '@vroom-web/ui';
import React from 'react';

import Santander from './Santander';
import TDA from './TDA';
import Vroom from './Vroom';

interface Props {
  brand: Brand;
}
const Cars: React.FC<Props> = ({ brand }) => {
  if (brand === Brand.SANTANDER) {
    return <Santander />;
  } else if (brand === Brand.TDA) {
    return <TDA />;
  }
  return <Vroom />;
};

export default Cars;
