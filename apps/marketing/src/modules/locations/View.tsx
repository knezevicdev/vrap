import { TDAFooter } from '@vroom-web/footer-components';
import { TDAHeader } from '@vroom-web/header-components';
import React from 'react';

import ContactModule from './components/ContactModule';
import Hero from './components/Hero';
import Locations from './components/Locations';
import MarketingInfo from './components/MarketingInfo';
import SuperCenterInfo from './components/SuperCenterInfo';

const View: React.FC = () => {
  return (
    <>
      <TDAHeader />
      <Hero />
      <SuperCenterInfo />
      <MarketingInfo />
      <Locations />
      <ContactModule />
      <TDAFooter />
    </>
  );
};

export default View;
