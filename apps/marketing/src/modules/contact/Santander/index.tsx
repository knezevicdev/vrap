import { SantanderFooter } from '@vroom-web/footer-components';
import { SantanderHeader } from '@vroom-web/header-components';
import React from 'react';

import getConfig from 'next/config';
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
