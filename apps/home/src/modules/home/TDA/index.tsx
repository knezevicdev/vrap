import { TDAFooter } from '@vroom-web/footer-components';
import { TDAHeader } from '@vroom-web/header-components';
import getConfig from 'next/config';
import React from 'react';

import Banner from './components/Banner';
import Divider from './components/Divider';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import HowItWorks from './components/HowItWorks';
import Location from './components/Location';
import VehicleSearch from './components/VehicleSearch';

const {
  publicRuntimeConfig: { VROOM_URL },
} = getConfig();

const TDA: React.FC = () => {
  return (
    <>
      <TDAHeader vroomUrl={VROOM_URL} />
      <Banner />
      <Hero />
      <VehicleSearch />
      <Highlights />
      <Divider />
      <HowItWorks />
      <Location />
      <TDAFooter vroomUrl={VROOM_URL} />
    </>
  );
};

export default TDA;
