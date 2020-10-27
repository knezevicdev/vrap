import React from 'react';
import Hero from './components/Hero';
import SuperCenterInfo from './components/SuperCenterInfo';
import MarketingInfo from './components/MarketingInfo';
import Locations from './components/Locations';
import ContactModule from './components/ContactModule';
import { TDAHeader } from '@vroom-web/header-components';
import { TDAFooter } from '@vroom-web/footer-components';

const View = () => {
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
