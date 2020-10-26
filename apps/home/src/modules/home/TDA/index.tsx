import { TDAFooter } from '@vroom-web/footer-components';
import { TDAHeader } from '@vroom-web/header-components';
import React from 'react';

import Divider from './components/Divider';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import HowItWorks from './components/HowItWorks';
import VehicleSearch from './components/VehicleSearch';

const TDA: React.FC = () => {
  return (
    <>
      <TDAHeader />
      <Hero />
      <VehicleSearch />
      <Highlights />
      <Divider />
      <HowItWorks />
      <TDAFooter />
    </>
  );
};

export default TDA;
