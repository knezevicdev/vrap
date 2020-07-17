import Divider from '@material-ui/core/Divider';
import React from 'react';

import Hero from './components/Hero';
import Highlights from './components/Highlights';
import HowItWorks from './components/HowItWorks';
import {SantanderFooter} from "@vroom-web/footer-components";

const Santander: React.FC = () => {
  return (
    <>
      <Hero />
      <Highlights />
      <Divider />
      <HowItWorks />
      <SantanderFooter/>
    </>
  );
};

export default Santander;
