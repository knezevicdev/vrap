import { StandardFooter } from '@vroom-web/footer-components';
import { InProgressDealBar, SimpleHeader } from '@vroom-web/header-components';
import React from 'react';

import CustomerQuote from './components/CustomerQuote';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import HowItWorks from './components/HowItWorks';
import Quotes from './components/Quotes';
import Values from './components/Values';
import WhoWeAre from './components/WhoWeAre';

import globalEnv from 'src/globalEnv';

const Home: React.FC = () => {
  const gearboxPrivateUrl = globalEnv.GEARBOX_PRIVATE_URL;
  return (
    <>
      <SimpleHeader />
      {gearboxPrivateUrl && (
        <InProgressDealBar gearboxPrivateUrl={gearboxPrivateUrl} />
      )}
      <Hero />
      <Highlights />
      <Values />
      <CustomerQuote />
      <HowItWorks />
      <Quotes />
      <WhoWeAre />
      <StandardFooter />
    </>
  );
};

export default Home;
