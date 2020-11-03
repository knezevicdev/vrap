import { TDAFooter } from '@vroom-web/footer-components';
import { TDAHeader } from '@vroom-web/header-components';
import getConfig from 'next/config';
import React from 'react';

import ContactModule from './components/ContactModule';
import Hero from './components/Hero';
import Locations from './components/Locations';
import MarketingInfo from './components/MarketingInfo';
import SuperCenterInfo from './components/SuperCenterInfo';

const {
  publicRuntimeConfig: { VROOM_URL },
} = getConfig();

const LocationsView: React.FC = () => {
  return (
    <>
      <TDAHeader vroomUrl={VROOM_URL} />
      <Hero />
      <SuperCenterInfo />
      <MarketingInfo />
      <Locations />
      <ContactModule />
      <TDAFooter vroomUrl={VROOM_URL} />
    </>
  );
};

export default LocationsView;
