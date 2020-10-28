import { TDAFooter } from '@vroom-web/footer-components';
import { TDAHeader } from '@vroom-web/header-components';
import React from 'react';

import ContactModule from '../components/ContactModule';
import MarketingInfo from '../components/MarketingInfo';
import ContactInfo from './components/ContactInfo';

const LocationView: React.FC = () => {
  return (
    <>
      <TDAHeader />
      {/* <Hero />*/}
      <ContactInfo />
      <MarketingInfo />
      {/* {/* <Locations /> */}
      <ContactModule />
      <TDAFooter />
    </>
  );
};

export default LocationView;
