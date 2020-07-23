import { SantanderFooter } from '@vroom-web/footer-components';
import { SantanderHeader } from '@vroom-web/header-components';
import React from 'react';

import Content from './content';

const Santander: React.FC = () => {
  return (
    <>
      <SantanderHeader />
      <Content />
      <SantanderFooter />
    </>
  );
};

export default Santander;
