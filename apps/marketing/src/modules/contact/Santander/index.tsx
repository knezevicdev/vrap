import { SantanderFooter } from '@vroom-web/footer-components';
import { SantanderHeader } from '@vroom-web/header-components';
import getConfig from 'next/config';
import React from 'react';
const {
  publicRuntimeConfig: { VROOM_URL },
} = getConfig();

import Content from './content';

const Santander: React.FC = () => {
  return (
    <>
      <SantanderHeader />
      <Content />
      <SantanderFooter vroomUrl={VROOM_URL} />
    </>
  );
};

export default Santander;
