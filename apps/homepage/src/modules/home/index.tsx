import { StandardFooter } from '@vroom-web/footer-components';
import { InProgressDealBar, SimpleHeader } from '@vroom-web/header-components';
import React from 'react';

import Hero from './components/Hero';
import Highlights from './components/Highlights';
import JuneteenthBanner from './components/JuneteenthBanner';
import QuoteHIW from './components/QuoteHIW';
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
      <JuneteenthBanner />
      <Hero />
      <Highlights />
      <Values />
      <QuoteHIW />
      <Quotes />
      <WhoWeAre />
      <StandardFooter />
    </>
  );
};

export default Home;
