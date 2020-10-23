import { TDAFooter } from '@vroom-web/footer-components';
import { TDAHeader } from '@vroom-web/header-components';
import React from 'react';

import Divider from './components/Divider';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import HowItWorks from './components/HowItWorks';

const TDA: React.FC = () => {
  return (
    <>
      <TDAHeader />
      <Hero />
      <Highlights />
      <Divider />
      <HowItWorks />
      <TDAFooter />
    </>
  );
};

export default TDA;
