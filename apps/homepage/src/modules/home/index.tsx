import { StandardFooter } from '@vroom-web/footer-components';
import { SimpleHeader } from '@vroom-web/header-components';
import React from 'react';

import CustomerQuote from './components/CustomerQuote';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import HowItWorks from './components/HowItWorks';
import Quotes from './components/Quotes';
import Values from './components/Values';
import WhoWeAre from './components/WhoWeAre';

const Home: React.FC = () => {
  return (
    <>
      <SimpleHeader />
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
