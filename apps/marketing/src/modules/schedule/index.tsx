import { Brand } from '@vroom-web/ui';
import React, { useContext } from 'react';

import { BrandContext } from './BrandContext';
import Vroom from './Vroom';

const Schedule: React.FC = () => {
  const brand = useContext(BrandContext);
  if (brand === Brand.VROOM) {
    return <Vroom />;
  }
  return null;
};

export default Schedule;
