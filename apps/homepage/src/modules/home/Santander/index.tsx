import { SantanderFooter } from '@vroom-web/footer-components';
import { SantanderHeader } from '@vroom-web/header-components';
import React from 'react';

import Divider from './components/Divider';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import HowItWorks from './components/HowItWorks';

const Santander: React.FC = () => {
  return (
    <>
      <SantanderHeader />
      <Hero />
      <Highlights />
      <Divider />
      <HowItWorks />
      <SantanderFooter />
    </>
  );
};

export default Santander;
