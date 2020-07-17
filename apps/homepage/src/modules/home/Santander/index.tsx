import Divider from '@material-ui/core/Divider';
import React from 'react';

import Hero from './components/Hero';
import Highlights from './components/Highlights';
import HowItWorks from './components/HowItWorks';

const Santander: React.FC = () => {
  return (
    <>
      <Hero />
      <Highlights />
      <Divider />
      <HowItWorks />
    </>
  );
};

export default Santander;
