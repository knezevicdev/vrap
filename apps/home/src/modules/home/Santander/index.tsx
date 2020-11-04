import { SantanderFooter } from '@vroom-web/footer-components';
import { SantanderHeader } from '@vroom-web/header-components';
import getConfig from 'next/config';
import React from 'react';

import Divider from './components/Divider';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import HowItWorks from './components/HowItWorks';
const {
  publicRuntimeConfig: { VROOM_URL },
} = getConfig();

const Santander: React.FC = () => {
  return (
    <>
      <SantanderHeader />
      <Hero />
      <Highlights />
      <Divider />
      <HowItWorks />
      <SantanderFooter vroomUrl={VROOM_URL} />
    </>
  );
};

export default Santander;
